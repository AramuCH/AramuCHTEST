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

    // オプション: スクロールで要素がフェードインするアニメーション
    // Intersection Observer APIを使用
    const fadinElements = document.querySelectorAll('section, .profile-icon, .media-item, .contact-form');

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
});
