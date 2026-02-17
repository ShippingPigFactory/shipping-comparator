// src/utils/calculator.ts
import { SHIPPING_RATES } from "../constants/data";

export type CarrierType = 'sagawa_btob' | 'sagawa_normal' | 'yamato_default';

// UI用の地域ID
export type RegionId =
    | 'hokkaido' | 'kita_tohoku' | 'minami_tohoku' | 'kanto' | 'shinetsu'
    | 'hokuriku' | 'tokai_chubu' | 'kansai' | 'chugoku' | 'shikoku'
    | 'kita_kyushu' | 'minami_kyushu' | 'okinawa';

export interface PackageItem {
    id: string;
    size: number;
    count: number;
}

export interface CalculationResult {
    total: number;
    error?: string;
    details: { size: number; count: number; cost: number }[];
}

export const REGIONS: { id: RegionId; label: string }[] = [
    { id: 'hokkaido', label: '北海道' },
    { id: 'kita_tohoku', label: '北東北 (青森・秋田・岩手)' },
    { id: 'minami_tohoku', label: '南東北 (宮城・山形・福島)' },
    { id: 'kanto', label: '関東' },
    { id: 'shinetsu', label: '信越 (新潟・長野)' },
    { id: 'hokuriku', label: '北陸 (富山・石川・福井)' },
    { id: 'tokai_chubu', label: '東海/中部 (静岡・愛知・岐阜・三重)' },
    { id: 'kansai', label: '関西' },
    { id: 'chugoku', label: '中国' },
    { id: 'shikoku', label: '四国' },
    { id: 'kita_kyushu', label: '北九州 (福岡・佐賀・長崎・大分)' },
    { id: 'minami_kyushu', label: '南九州 (熊本・宮崎・鹿児島)' },
    { id: 'okinawa', label: '沖縄' },
];

export const getAvailableSizes = (carrier: CarrierType): number[] => {
    if (carrier === 'sagawa_btob') return [60, 80, 100, 120, 140, 160, 170, 180, 200];
    if (carrier === 'sagawa_normal') return [60, 80, 100, 120, 140, 160];
    if (carrier === 'yamato_default') return [60, 80, 100];
    return [];
};

export const calculateShipping = (
    carrier: CarrierType,
    regionId: RegionId,
    packages: PackageItem[]
): CalculationResult => {
    let total = 0;
    const details: { size: number; count: number; cost: number }[] = [];

    // 佐川は沖縄非対応（データなし）
    if (carrier.startsWith('sagawa') && regionId === 'okinawa') {
        return { total: 0, error: '佐川急便は沖縄のデータがありません', details: [] };
    }

    for (const pkg of packages) {
        if (pkg.count <= 0) continue;

        let unitPrice = 0;
        const sizeKey = String(pkg.size) as keyof typeof SHIPPING_RATES.sagawa.btob; // 型安全のためのキャスト

        if (carrier === 'sagawa_btob') {
            const regionKey = mapToSagawaRegion(regionId);
            // @ts-ignore: データ構造のアクセス簡略化
            unitPrice = SHIPPING_RATES.sagawa.btob[sizeKey]?.[regionKey] || 0;
        } else if (carrier === 'sagawa_normal') {
            const regionKey = mapToSagawaRegion(regionId);
            // @ts-ignore
            unitPrice = SHIPPING_RATES.sagawa.normal[sizeKey]?.[regionKey] || 0;
        } else if (carrier === 'yamato_default') {
            const regionKey = mapToYamatoRegion(regionId);
            // @ts-ignore
            unitPrice = SHIPPING_RATES.yamato.default[sizeKey]?.[regionKey] || 0;
        }

        if (unitPrice === 0) {
            return { total: 0, error: `${pkg.size}サイズはこの地域に対応していません`, details: [] };
        }

        const lineCost = unitPrice * pkg.count;
        total += lineCost;
        details.push({ size: pkg.size, count: pkg.count, cost: lineCost });
    }

    return { total, details };
};

// 内部用: 地域マッピング関数
const mapToSagawaRegion = (id: RegionId): string => {
    switch (id) {
        case 'tokai_chubu': return 'tokai';
        case 'kita_kyushu': return 'kita_kyushu';
        case 'minami_kyushu': return 'minami_kyushu';
        default: return id;
    }
};

const mapToYamatoRegion = (id: RegionId): string => {
    switch (id) {
        case 'tokai_chubu': return 'chubu';
        case 'kita_kyushu': return 'kyushu';
        case 'minami_kyushu': return 'kyushu';
        case 'hokuriku': return 'hokuriku'; // ヤマトは北陸と中部が別
        default: return id;
    }
};