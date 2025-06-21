document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // スクロールで要素がフェードインするアニメーション (Intersection Observer APIを使用)
    const fadinElements = document.querySelectorAll(
        // 全ページ共通のセクション
        'section, .hero-content, .profile-icon, .main-header, .main-footer, ' +
        '.container, .site-title, .main-nav ul li, ' + // ナビリンクも個別にアニメート
        
        // index.htmlの要素
        '.about-brief-content, .schedule-list li, .media-item, .more-section-item, ' +
        
        // about.htmlの要素
        '.about-detail-grid > div, .about-text-content h3, .about-text-content p, .about-text-content ul li, .sns-links-inline a, ' +
        
        // goods.htmlの要素
        '.goods-item, ' +
        
        // fanletter.htmlの要素
        '.fanletter-section-item, .address-box, ' +
        
        // contact.htmlの要素
        '.contact-form .form-group, .contact-form button, ' +
        
        // privacy.htmlの要素
        '.privacy-content h3, .privacy-content p, .privacy-content ul li'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05 // 要素の5%が見えたら発火に調整
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadinElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // 基本のトランジション
        
        // 特定の要素には遅延アニメーションを適用して動きに変化をつける
        if (element.classList.contains('schedule-list') || element.classList.contains('sns-links') || element.classList.contains('goods-grid') || element.classList.contains('media-grid') || element.classList.contains('more-sections-grid')) {
             // グリッド内の個々のアイテムには別途遅延を設定するため、ここでは親要素に設定しない
        } else if (element.tagName === 'LI' && element.closest('.schedule-list')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 0.1; // 0.1秒ずつ遅延
            element.style.transitionDelay = `${delay}s`;
        } else if (element.classList.contains('media-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            const delay = index * 0.15; // メディアアイテムは少し長めに遅延
            element.style.transitionDelay = `${delay}s`;
        } else if (element.classList.contains('goods-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            const delay = index * 0.15;
            element.style.transitionDelay = `${delay}s`;
        } else if (element.classList.contains('more-section-item')) {
            const index = Array.from(element.parentNode.children).indexOf(element);
            const delay = index * 0.15;
            element.style.transitionDelay = `${delay}s`;
        } else if (element.classList.contains('form-group')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 0.1;
            element.style.transitionDelay = `${delay}s`;
        }
        
        observer.observe(element);
    });


    // お問い合わせフォームの送信処理 (実際にはサーバーサイドの処理が必要)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('メッセージを送信しました！ありがとうございます！');
            this.reset();
        });
    }

    // 現在のページに対応するナビゲーションリンクをアクティブにする処理
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active-nav-link');
        }
    });
});
