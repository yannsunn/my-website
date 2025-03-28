/**
 * マイクロインタラクション機能拡張
 * ユーザー体験向上とコンバージョン率改善のための機能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 各機能の初期化
    initScrollAnimations();
    initButtonEffects();
    initFormEnhancements();
    initSocialProof();
    initPageTransitions();
    initUserFeedback();
    
    // 緊急性要素を追加（オプション - 必要に応じてコメントを外す）
    // addUrgencyElements();
});

/**
 * スクロールアニメーション初期化
 */
function initScrollAnimations() {
    // アニメーション要素の取得
    const animatedElements = document.querySelectorAll(
        '.fade-in-element, .fade-in-left, .fade-in-right, .scale-in, .stagger-animation'
    );
    
    // 要素が存在する場合のみIntersection Observerを設定
    if (animatedElements.length > 0) {
        // Intersection Observerの設定
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // 一度表示されたら監視を解除
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // 各要素を監視対象に追加
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // スクロールプロンプトのフェードアウト
    const scrollPrompt = document.querySelector('.scroll-prompt');
    if (scrollPrompt) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollPrompt.style.opacity = '0';
            } else {
                scrollPrompt.style.opacity = '1';
            }
        });
    }
}

/**
 * ボタン効果の初期化
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .cta-button');
    
    // ボタン要素が存在する場合のみイベントリスナーを設定
    if (buttons.length > 0) {
        buttons.forEach(button => {
            // リップルエフェクト
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 700);
            });
            
            // ホバーエフェクト強化
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }
    
    // CTAボタンの特別強調
    const ctaButtons = document.querySelectorAll('.primary-cta');
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            setInterval(() => {
                button.classList.add('pulse-attention');
                setTimeout(() => {
                    button.classList.remove('pulse-attention');
                }, 1000);
            }, 10000); // 10秒ごとに注目を集める
        });
    }
}

/**
 * フォーム機能強化
 */
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    // フォーム要素が存在する場合のみ処理を実行
    if (forms.length > 0) {
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            // フォーム入力フィードバック
            inputs.forEach(input => {
                // ラベル効果
                input.addEventListener('focus', function() {
                    const label = this.previousElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.classList.add('active');
                    }
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    const label = this.previousElementSibling;
                    if (label && label.tagName === 'LABEL' && this.value === '') {
                        label.classList.remove('active');
                    }
                    this.parentElement.classList.remove('focused');
                    
                    // シンプルなバリデーション
                    if (this.required && this.value === '') {
                        this.parentElement.classList.add('error');
                    } else {
                        this.parentElement.classList.remove('error');
                    }
                });
                
                // 入力中の視覚フィードバック
                input.addEventListener('input', function() {
                    if (this.value !== '') {
                        this.classList.add('has-value');
                    } else {
                        this.classList.remove('has-value');
                    }
                });
            });
            
            // フォーム送信エフェクト
            form.addEventListener('submit', function(e) {
                // 実際の送信処理は別に行う想定
                if (!form.classList.contains('no-animation')) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('[type="submit"]');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.classList.add('submitting');
                        
                        // 送信成功演出 (実際の送信はAJAXなどで行う)
                        setTimeout(() => {
                            submitBtn.classList.remove('submitting');
                            submitBtn.classList.add('success');
                            submitBtn.textContent = '送信完了！';
                            
                            // フォームをリセット
                            setTimeout(() => {
                                this.reset();
                                submitBtn.disabled = false;
                                submitBtn.classList.remove('success');
                                submitBtn.textContent = '送信する';
                                
                                // 成功メッセージ
                                const successMessage = document.createElement('div');
                                successMessage.classList.add('form-success-message');
                                successMessage.textContent = 'お問い合わせありがとうございます。24時間以内にご連絡いたします。';
                                
                                // 親要素が存在することを確認
                                if (this.parentNode) {
                                    this.parentNode.appendChild(successMessage);
                                    
                                    setTimeout(() => {
                                        if (successMessage.parentNode) {
                                            successMessage.parentNode.removeChild(successMessage);
                                        }
                                    }, 5000);
                                }
                            }, 2000);
                        }, 1500);
                    }
                }
            });
        });
    }
}

/**
 * ソーシャルプルーフ要素の初期化
 */
function initSocialProof() {
    // 閲覧者数通知
    const viewCounters = document.querySelectorAll('.view-counter');
    if (viewCounters.length > 0) {
        viewCounters.forEach(counter => {
            const baseCount = parseInt(counter.getAttribute('data-base-count') || '100');
            const randomViews = baseCount + Math.floor(Math.random() * 50);
            counter.textContent = `${randomViews}人が閲覧中`;
            
            // 数値を時間とともに微増
            setInterval(() => {
                if (counter && counter.textContent) {
                    const currentCount = parseInt(counter.textContent);
                    const change = Math.random() > 0.5 ? 1 : -1;
                    if (currentCount + change >= baseCount && currentCount + change <= baseCount + 100) {
                        counter.textContent = `${currentCount + change}人が閲覧中`;
                    }
                }
            }, 30000);
        });
    }
    
    // 最近の購入者通知
    const recentBuyers = [
        { name: '田中さん', location: '東京', time: '5分前' },
        { name: '佐藤さん', location: '大阪', time: '12分前' },
        { name: '鈴木さん', location: '名古屋', time: '18分前' },
        { name: '高橋さん', location: '福岡', time: '24分前' },
        { name: '伊藤さん', location: '北海道', time: '30分前' }
    ];
    
    const purchaseNotifications = document.querySelector('.recent-purchases');
    if (purchaseNotifications) {
        let index = 0;
        
        function showNextPurchase() {
            if (!purchaseNotifications) return; // 要素が存在するか再確認
            
            const buyer = recentBuyers[index];
            const notification = document.createElement('div');
            notification.classList.add('purchase-notification');
            notification.innerHTML = `<strong>${buyer.name}</strong> (${buyer.location})が${buyer.time}にサービスを申し込みました`;
            
            purchaseNotifications.innerHTML = '';
            purchaseNotifications.appendChild(notification);
            
            // フェードインアニメーション
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 100);
            
            // 次の購入者へ
            index = (index + 1) % recentBuyers.length;
        }
        
        // 最初の表示
        showNextPurchase();
        
        // 定期的に表示を更新
        setInterval(showNextPurchase, 15000);
    }
}

/**
 * ページ遷移エフェクト
 */
function initPageTransitions() {
    // ページ内リンクのスムーズスクロール
    const pageLinks = document.querySelectorAll('a[href^="#"]');
    
    if (pageLinks.length > 0) {
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // スムーズスクロール
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
                        behavior: 'smooth'
                    });
                    
                    // URLの更新（オプション）
                    history.pushState(null, null, targetId);
                    
                    // ナビゲーションのアクティブ状態更新
                    const navLinks = document.querySelectorAll('nav a');
                    if (navLinks.length > 0) {
                        navLinks.forEach(navLink => {
                            navLink.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                }
            });
        });
    }
    
    // セクションが存在するか確認
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        // スクロール位置に基づくナビゲーションのアクティブ状態更新
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // 各セクションをチェック
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const correspondingNavLink = document.querySelector(`nav a[href="#${section.id}"]`);
                    if (correspondingNavLink) {
                        const navLinks = document.querySelectorAll('nav a');
                        if (navLinks.length > 0) {
                            navLinks.forEach(link => {
                                link.classList.remove('active');
                            });
                            correspondingNavLink.classList.add('active');
                        }
                    }
                }
            });
        });
    }
}

/**
 * ユーザーフィードバック強化
 */
function initUserFeedback() {
    // カードのホバーエフェクト強化
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const otherCards = document.querySelectorAll('.card:not(:hover)');
                if (otherCards.length > 0) {
                    otherCards.forEach(otherCard => {
                        otherCard.style.opacity = '0.8';
                        otherCard.style.transform = 'scale(0.95)';
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const allCards = document.querySelectorAll('.card');
                if (allCards.length > 0) {
                    allCards.forEach(c => {
                        c.style.opacity = '1';
                        c.style.transform = '';
                    });
                }
            });
        });
    }
    
    // トースト通知システム
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        toast.textContent = message;
        
        // 既存のトースト要素を確認
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.classList.add('toast-container');
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.appendChild(toast);
        
        // アニメーション
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // 自動消去
        setTimeout(() => {
            if (toast) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                        
                        // コンテナが空になったら削除
                        if (toastContainer && toastContainer.children.length === 0 && toastContainer.parentNode) {
                            toastContainer.parentNode.removeChild(toastContainer);
                        }
                    }
                }, 300);
            }
        }, duration);
    };
    
    // ページ滞在時間トラッキング
    let pageEntryTime = new Date();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = (new Date() - pageEntryTime) / 1000; // 秒単位
        
        // 長時間滞在した場合のフィードバック（例：アンケート表示）
        if (timeSpent > 120) { // 2分以上滞在
            // 実際のサイトではここでアンケートや再訪問促進の処理
            console.log('長時間滞在ユーザー: ' + timeSpent + '秒');
        }
    });
}

/**
 * 緊急性を演出する要素の追加
 */
function addUrgencyElements() {
    // 残り席数表示
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            const remainingSpots = Math.floor(Math.random() * 5) + 1;
            const urgencyBadge = document.createElement('div');
            urgencyBadge.classList.add('urgency-badge');
            urgencyBadge.textContent = `残り${remainingSpots}席のみ`;
            card.appendChild(urgencyBadge);
        });
    }
    
    // カウントダウンタイマー
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const now = new Date();
        const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        endTime.setHours(23, 59, 59, 0);
        
        const countdownTimer = document.createElement('div');
        countdownTimer.classList.add('countdown-timer');
        countdownTimer.innerHTML = `
            <div class="countdown-label">期間限定オファー終了まで</div>
            <div class="countdown-time">
                <span class="countdown-hours">00</span>:
                <span class="countdown-minutes">00</span>:
                <span class="countdown-seconds">00</span>
            </div>
        `;
        
        ctaSection.insertBefore(countdownTimer, ctaSection.firstChild);
        
        // カウントダウン更新
        function updateCountdown() {
            if (!countdownTimer || !document.contains(countdownTimer)) return;
            
            const now = new Date();
            const timeLeft = endTime - now;
            
            if (timeLeft <= 0) {
                countdownTimer.innerHTML = '<div class="countdown-ended">オファー終了しました</div>';
                return;
            }
            
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const hoursElement = countdownTimer.querySelector('.countdown-hours');
            const minutesElement = countdownTimer.querySelector('.countdown-minutes');
            const secondsElement = countdownTimer.querySelector('.countdown-seconds');
            
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
} 