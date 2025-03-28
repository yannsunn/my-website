/**
 * カードレイアウト最適化用JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // カードの高さを均一化する関数
    function equalizeCardHeights() {
        // サービスカードの高さを均一化
        const serviceCards = document.querySelectorAll('.service-cards .card');
        if (serviceCards.length > 0) {
            // モバイル表示では高さをリセット
            if (window.innerWidth <= 768) {
                serviceCards.forEach(card => {
                    card.style.height = 'auto';
                });
                return;
            }
            
            // 最大の高さを取得
            let maxHeight = 0;
            serviceCards.forEach(card => {
                card.style.height = 'auto'; // 一旦リセット
                const height = card.offsetHeight;
                maxHeight = Math.max(maxHeight, height);
            });
            
            // すべてのカードを同じ高さに設定
            serviceCards.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        }
        
        // 実績カードの高さを均一化
        const achievementItems = document.querySelectorAll('.achievement-item');
        if (achievementItems.length > 0 && window.innerWidth > 768) {
            let maxHeight = 0;
            achievementItems.forEach(item => {
                item.style.height = 'auto';
                const height = item.offsetHeight;
                maxHeight = Math.max(maxHeight, height);
            });
            
            achievementItems.forEach(item => {
                item.style.height = `${maxHeight}px`;
            });
        }
    }
    
    // 「おすすめ」ラベルの位置を最適化
    function optimizeRecommendedLabel() {
        const highlightCard = document.querySelector('.card.highlight');
        if (highlightCard) {
            // カードの幅に基づいてラベルの位置を調整
            const cardWidth = highlightCard.offsetWidth;
            
            // スタイルを動的に調整
            const labelStyle = document.createElement('style');
            labelStyle.textContent = `
                .card.highlight::before {
                    right: -${cardWidth / 3}px;
                    width: ${cardWidth}px;
                    text-align: center;
                }
            `;
            
            // 既存のスタイルタグを探し、存在すれば更新、なければ追加
            const existingStyle = document.getElementById('highlight-label-style');
            if (existingStyle) {
                existingStyle.textContent = labelStyle.textContent;
            } else {
                labelStyle.id = 'highlight-label-style';
                document.head.appendChild(labelStyle);
            }
        }
    }
    
    // 初期化とリサイズイベント
    equalizeCardHeights();
    optimizeRecommendedLabel();
    
    window.addEventListener('resize', function() {
        equalizeCardHeights();
        optimizeRecommendedLabel();
    });
    
    // コンテンツの読み込み完了後に再実行
    window.addEventListener('load', function() {
        equalizeCardHeights();
        optimizeRecommendedLabel();
    });
}); 