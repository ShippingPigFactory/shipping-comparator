// src/components/PatternPanel.tsx
import React, { useEffect, useState } from 'react';
import {
    type CarrierType, type RegionId, type PackageItem, REGIONS,
    getAvailableSizes, calculateShipping, type CalculationResult
} from '../utils/calculator';
import styles from './PatternPanel.module.scss'; // 後で作ります

interface Props {
    title: string;
    isWinner: boolean;
    onResultChange: (res: CalculationResult) => void;
}

export const PatternPanel: React.FC<Props> = ({ title, isWinner, onResultChange }) => {
    const [carrier, setCarrier] = useState<CarrierType>('sagawa_btob');
    const [region, setRegion] = useState<RegionId>('kanto');
    const [packages, setPackages] = useState<PackageItem[]>([
        { id: crypto.randomUUID(), size: 100, count: 1 }
    ]);
    const [result, setResult] = useState<CalculationResult>({ total: 0, details: [] });

    // 入力が変わるたびに再計算
    useEffect(() => {
        const res = calculateShipping(carrier, region, packages);
        setResult(res);
        onResultChange(res);
    }, [carrier, region, packages]);

    // 荷物追加
    const addPackage = () => {
        const defaultSize = getAvailableSizes(carrier)[0] || 60;
        setPackages([...packages, { id: crypto.randomUUID(), size: defaultSize, count: 1 }]);
    };

    // 荷物削除
    const removePackage = (id: string) => {
        setPackages(packages.filter(p => p.id !== id));
    };

    // 荷物更新
    const updatePackage = (id: string, field: 'size' | 'count', value: number) => {
        setPackages(packages.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const availableSizes = getAvailableSizes(carrier);

    // 業者が変わったら既存のパッケージサイズをリセット（不整合防止）
    const handleCarrierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCarrier = e.target.value as CarrierType;
        setCarrier(newCarrier);
        // 新しい業者のデフォルトサイズに合わせる
        const newSizes = getAvailableSizes(newCarrier);
        setPackages(packages.map(p => ({ ...p, size: newSizes.includes(p.size) ? p.size : newSizes[0] })));
    };

    return (
        <div className={`${styles.panel} ${isWinner ? styles.winner : ''}`}>
            <h2>{title}</h2>

            <div className={styles.formGroup}>
                <label>配送業者</label>
                <select value={carrier} onChange={handleCarrierChange}>
                    <option value="sagawa_btob">佐川急便 (BtoB)</option>
                    <option value="sagawa_normal">佐川急便 (通常)</option>
                    <option value="yamato_default">ヤマト運輸 (通常)</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>配送先地域</label>
                <select value={region} onChange={(e) => setRegion(e.target.value as RegionId)}>
                    {REGIONS.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                </select>
            </div>

            <div className={styles.packageList}>
                <label>荷物リスト</label>
                {packages.map((pkg) => (
                    <div key={pkg.id} className={styles.packageRow}>
                        <select
                            value={pkg.size}
                            onChange={(e) => updatePackage(pkg.id, 'size', Number(e.target.value))}
                        >
                            {availableSizes.map(size => (
                                <option key={size} value={size}>{size}サイズ</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min="1"
                            value={pkg.count}
                            onChange={(e) => updatePackage(pkg.id, 'count', Number(e.target.value))}
                        />
                        <span>個</span>
                        <button onClick={() => removePackage(pkg.id)} className={styles.deleteBtn}>×</button>
                    </div>
                ))}
                <button onClick={addPackage} className={styles.addBtn}>+ 荷物を追加</button>
            </div>

            <div className={styles.resultArea}>
                {result.error ? (
                    <p className={styles.error}>{result.error}</p>
                ) : (
                    <>
                        <div className={styles.totalPrice}>
                            ¥{result.total.toLocaleString()}
                        </div>
                        <div className={styles.details}>
                            {result.details.map((d, idx) => (
                                <div key={idx}>
                                    {d.size}サイズ × {d.count} = ¥{d.cost.toLocaleString()}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};