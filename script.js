document.addEventListener('DOMContentLoaded', () => {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ヘッダーの高さ分を考慮してスクロール
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
        'section, .profile-icon, .media-item, .contact-form, ' +
        '.about-image-large, .goods-item, .fanletter-section-item, ' +
        '.about-brief-content, .more-section-item, .schedule-list li' // 新しく追加された要素やリストアイテムも対象に
    );

    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 要素の10%が見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 一度アニメーションしたら監視を停止
            }
        });
    }, observerOptions);

    fadinElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });

    // お問い合わせフォームの送信処理 (実際にはサーバーサイドの処理が必要)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // フォームのデフォルト送信をキャンセル
            alert('メッセージを送信しました！ありがとうございます！');
            // ここにフォームデータをサーバーに送信する処理を書きます
            // 例: fetch('/api/contact', { method: 'POST', body: new FormData(this) })
            this.reset(); // フォームをリセット
        });
    }

    // 現在のページに対応するナビゲーションリンクをアクティブにする処理
    const currentPath = window.location.pathname.split('/').pop(); // 例: "about.html"
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // 現在のHTMLファイル名がリンクのhrefと一致するか、またはトップページの場合
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active-nav-link'); // アクティブクラスを追加
        }
    });
});
