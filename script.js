// DOM要素が読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール時アニメーション
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '';
            header.style.backgroundColor = '';
            header.style.boxShadow = '';
        }
    });
    
    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // 「#」だけのリンクの場合は処理しない
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQアコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = question.querySelector('.toggle-icon');
        
        // 初期状態では最初のFAQを開く
        if (item === faqItems[0]) {
            item.classList.add('active');
            answer.style.display = 'block';
            toggleIcon.textContent = '−';
        }
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 全てのFAQを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.display = 'none';
                faq.querySelector('.toggle-icon').textContent = '+';
            });
            
            // クリックされたFAQが閉じていたら開く
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
                toggleIcon.textContent = '−';
            }
        });
    });
    
    // お問い合わせフォーム送信
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // 必須項目のバリデーション
            const requiredFields = ['name', 'email', 'phone', 'message', 'service'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                const value = input.value.trim();
                
                if (!value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // プライバシーポリシーのチェック
            const privacyCheck = document.getElementById('privacy');
            if (!privacyCheck.checked) {
                isValid = false;
                privacyCheck.parentElement.classList.add('error');
            } else {
                privacyCheck.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // 送信成功時の処理
                // 実際のプロジェクトではここでAPIリクエストやメール送信処理を行います
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
                
                // 送信処理をシミュレート（実際の実装ではここを適切なAPIコールに置き換えてください）
                setTimeout(() => {
                    contactForm.reset();
                    showNotification('お問い合わせを受け付けました。担当者から折り返しご連絡いたします。', 'success');
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 1500);
            } else {
                showNotification('入力内容に不備があります。必須項目を入力してください。', 'error');
            }
        });
    }
    
    // 通知表示関数
    function showNotification(message, type) {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // 通知を表示
        document.body.appendChild(notification);
        
        // CSSアニメーションのためのタイミング
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 閉じるボタンのイベントリスナー
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // 一定時間後に自動的に閉じる
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // スタイルを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #e74c3c !important;
            background-color: rgba(231, 76, 60, 0.05);
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 15px;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification.success .notification-content i {
            color: #2ecc71;
        }
        
        .notification.error .notification-content i {
            color: #e74c3c;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #999;
            font-size: 0.9rem;
            padding: 5px;
        }
        
        .notification-close:hover {
            color: #333;
        }
    `;
    document.head.appendChild(style);
    
    // 数字のカウントアップアニメーション
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-value');
        
        stats.forEach(stat => {
            const targetValue = stat.textContent;
            const prefix = targetValue.startsWith('+') ? '+' : '';
            const suffix = targetValue.includes('%') ? '%' : '';
            let value = parseInt(targetValue.replace(/[^0-9]/g, ''));
            
            stat.textContent = prefix + '0' + suffix;
            
            let startTimestamp = null;
            const duration = 2000; // アニメーション時間（ミリ秒）
            
            function step(timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentValue = Math.floor(progress * value);
                
                stat.textContent = prefix + currentValue + suffix;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    stat.textContent = targetValue;
                }
            }
            
            window.requestAnimationFrame(step);
        });
    }
    
    // スクロール監視によるアニメーション発火
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('achievement-gallery')) {
                    animateNumbers();
                    observer.unobserve(entry.target); // 一度だけ実行
                }
                
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });
    
    // アニメーション対象の要素を監視
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // 実績セクションのカウントアップアニメーション
    const achievementGallery = document.querySelector('.achievement-gallery');
    if (achievementGallery) {
        observer.observe(achievementGallery);
    }
    
    // テスティモニアルスライダー
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 0) {
        // 初期状態ではすべて表示
        if (window.innerWidth <= 768) {
            showSlide(currentSlide);
        }
        
        // 一定時間ごとにスライド切り替え（モバイルのみ）
        setInterval(() => {
            if (window.innerWidth <= 768) {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            }
        }, 5000);
    }
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // CVR向上のためのマイクロインタラクション
    function enhanceCTAButtons() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-submit, .btn-service, .btn-float');
        
        ctaButtons.forEach(button => {
            // クリック効果
            button.addEventListener('click', function(e) {
                // すでにrippleがあれば削除
                this.querySelectorAll('.btn-ripple').forEach(el => el.remove());
                
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                
                // クリック位置からの相対的な配置
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                this.appendChild(ripple);
                
                // アニメーション終了後に削除
                setTimeout(() => {
                    ripple.remove();
                }, 700);
            });
            
            // ホバー効果強化
            button.addEventListener('mouseenter', function() {
                this.classList.add('cta-hover');
            });
            
            button.addEventListener('mouseleave', function() {
                this.classList.remove('cta-hover');
            });
        });
        
        // CTAボタン用のスタイル追加
        const ctaStyle = document.createElement('style');
        ctaStyle.textContent = `
            .btn-ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.7s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .cta-hover {
                transform: scale(1.05) translateY(-3px) !important;
            }
        `;
        document.head.appendChild(ctaStyle);
    }
    
    // フォーム体験の向上
    function enhanceFormExperience() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        // フォームフィールドへのフォーカス効果
        const formInputs = form.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // フォーカス効果
            input.addEventListener('focus', function() {
                this.closest('.form-group').classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.closest('.form-group').classList.remove('focused');
                }
            });
            
            // バリデーションフィードバック
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
        
        // フォーム送信時の改善されたフィードバック
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 入力チェック
            let isValid = true;
            formInputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                    input.closest('.form-group').classList.add('error');
                    
                    // シェイクアニメーション
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 500);
                } else {
                    input.classList.remove('invalid');
                    input.closest('.form-group').classList.remove('error');
                }
            });
            
            if (isValid) {
                // 成功フィードバック
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
                
                // 送信成功フィードバック（実際はAJAXリクエストを行う）
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> 送信完了';
                    submitButton.classList.add('success');
                    form.classList.add('form-success');
                    
                    // 成功メッセージ
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                        <h3>お問い合わせありがとうございます</h3>
                        <p>担当者より24時間以内にご連絡いたします。</p>
                    `;
                    
                    form.appendChild(successMessage);
                    
                    // フォームのリセット
                    setTimeout(() => {
                        form.reset();
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                        submitButton.classList.remove('success');
                        form.classList.remove('form-success');
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
        
        // フォーム用のスタイル追加
        const formStyle = document.createElement('style');
        formStyle.textContent = `
            .form-group.focused label {
                transform: translateY(-25px) scale(0.8);
                color: var(--accent-color);
            }
            
            .form-group label {
                position: relative;
                transition: all 0.3s ease;
                transform-origin: left;
            }
            
            .form-group.error label {
                color: #e74c3c;
            }
            
            .form-group.error input,
            .form-group.error textarea,
            .form-group.error select {
                border-color: #e74c3c;
                background-color: rgba(231, 76, 60, 0.05);
            }
            
            input.valid, textarea.valid, select.valid {
                border-color: var(--success-color) !important;
                background-color: rgba(46, 204, 113, 0.05);
            }
            
            input.invalid, textarea.invalid, select.invalid {
                border-color: #e74c3c !important;
            }
            
            .shake {
                animation: shake 0.5s linear;
            }
            
            @keyframes shake {
                0%, 100% {transform: translateX(0);}
                10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
                20%, 40%, 60%, 80% {transform: translateX(5px);}
            }
            
            .form-success-message {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                animation: fadeIn 0.5s forwards;
                border-radius: var(--border-radius);
            }
            
            .success-icon {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 20px;
            }
            
            .form-success-message h3 {
                margin-bottom: 10px;
                color: var(--dark-color);
            }
            
            .form-success-message p {
                color: var(--text-color);
            }
            
            button.success {
                background-color: var(--success-color);
            }
        `;
        document.head.appendChild(formStyle);
    }
    
    // 在庫・時間制限などの緊急感を作るための要素追加
    function addUrgencyElements() {
        // 特典表示
        const serviceCards = document.querySelectorAll('.card');
        serviceCards.forEach(card => {
            // ランダム残り数の生成（本番環境では実際のデータを使用）
            const remainingSpots = Math.floor(Math.random() * 5) + 1;
            
            const urgencyBadge = document.createElement('div');
            urgencyBadge.className = 'urgency-badge';
            urgencyBadge.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>残り<strong>${remainingSpots}</strong>枠のみ</span>
            `;
            
            // カードの最後に追加
            card.appendChild(urgencyBadge);
        });
        
        // スタイル追加
        const urgencyStyle = document.createElement('style');
        urgencyStyle.textContent = `
            .urgency-badge {
                background-color: rgba(231, 76, 60, 0.1);
                color: #e74c3c;
                padding: 8px 12px;
                border-radius: 4px;
                margin-top: 15px;
                display: flex;
                align-items: center;
                font-size: 0.9rem;
                font-weight: bold;
                animation: pulse 2s infinite;
            }
            
            .urgency-badge i {
                margin-right: 8px;
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(urgencyStyle);
    }
    
    // UX改善機能の初期化
    function initUXImprovements() {
        enhanceCTAButtons();
        enhanceFormExperience();
        addUrgencyElements();
    }
    
    // UX改善機能を実行
    initUXImprovements();
}); 