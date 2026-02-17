// src/App.tsx
import { useState } from 'react';
import { PatternPanel } from './components/PatternPanel';
import type { CalculationResult } from './utils/calculator';
import './App.scss';

function App() {
  const [resultA, setResultA] = useState<CalculationResult>({ total: 0, details: [] });
  const [resultB, setResultB] = useState<CalculationResult>({ total: 0, details: [] });

  const diff = Math.abs(resultA.total - resultB.total);
  const isACheaper = resultA.total > 0 && resultB.total > 0 && resultA.total < resultB.total && !resultA.error && !resultB.error;
  const isBCheaper = resultA.total > 0 && resultB.total > 0 && resultB.total < resultA.total && !resultA.error && !resultB.error;

  return (
    <div className="app-container">
      <header>
        <h1>配送コスト比較シミュレーター</h1>
        <p>佐川急便 vs ヤマト運輸</p>
      </header>

      {/* 比較結果のサマリー */}
      <div className="summary-bar">
        {(isACheaper || isBCheaper) ? (
          <div className="diff-message">
            <span>
              {isACheaper ? "Pattern A" : "Pattern B"} の方が
            </span>
            <span className="diff-price"> ¥{diff.toLocaleString()} </span>
            <span>お得です！</span>
          </div>
        ) : (
          <div className="info-message">条件を入力して比較してください</div>
        )}
      </div>

      <main className="comparison-grid">
        <PatternPanel
          title="Pattern A"
          isWinner={isACheaper}
          onResultChange={setResultA}
        />
        <PatternPanel
          title="Pattern B"
          isWinner={isBCheaper}
          onResultChange={setResultB}
        />
      </main>
    </div>
  );
}

export default App;