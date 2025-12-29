/* Datei: JS/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const vater = document.getElementById('vater');
    const sohn = document.getElementById('sohn');
    const vaterTab = document.getElementById('vaterTab');
    const sohnTab = document.getElementById('sohnTab');
    const introPicVater = document.getElementById('introPicVater');
    const interactiveSelectors = [
        '.YTVideo'
    ];

    const selector = interactiveSelectors
        .map(sel => `.seiteVater ${sel}, .seiteSohn ${sel}`)
        .join(', ');

// Füge Listener hinzu, die das Bubbling stoppen (click / mousedown / touchstart)
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('click', (e) => e.stopPropagation());
        el.addEventListener('mousedown', (e) => e.stopPropagation());
        el.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
    });

    // startFredi-Handler
    const startFredi = document.getElementById('startFredi');
    if (startFredi) {
        startFredi.addEventListener('click', (e) => {
            e.stopPropagation();
            const side = e.target.closest('#vater') ? 'vater' : (e.target.closest('#sohn') ? 'sohn' : null);
            if (side) expand(side);
            const target = document.getElementById('scrollFredi');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.hash = 'scrollFredi';
            }
        });
    }

    // Touch-Fallback Vater (introPicSohn entfernt, wurde nicht verwendet)
    if ('ontouchstart' in window && introPicVater && vater) {
        introPicVater.addEventListener('click', (e) => {
            e.stopPropagation();
            vater.classList.toggle('hover-visible-vater');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#introPicVater')) {
                vater.classList.remove('hover-visible-vater');
            }
        });
    }

    function reset() {
        if (vater) vater.classList.remove('expanded', 'collapsed');
        if (sohn) sohn.classList.remove('expanded', 'collapsed');
    }

    function expand(side) {
        if (!vater || !sohn) return;
        if (side === 'vater') {
            vater.classList.add('expanded');
            vater.classList.remove('collapsed');
            sohn.classList.add('collapsed');
            sohn.classList.remove('expanded');
        } else if (side === 'sohn') {
            sohn.classList.add('expanded');
            sohn.classList.remove('collapsed');
            vater.classList.add('collapsed');
            vater.classList.remove('expanded');
        }
    }

    // Klick-Handler (Logik beibehalten)
    if (vater) {
        vater.addEventListener('click', (e) => {
            if (vater.classList.contains('collapsed') && sohn.classList.contains('expanded')) {
                reset();
                return;
            }
            if (vater.classList.contains('expanded')) {
                reset();
            } else {
                expand('vater');
            }
        });
    }

    if (sohn) {
        sohn.addEventListener('click', (e) => {
            if (sohn.classList.contains('collapsed') && vater.classList.contains('expanded')) {
                reset();
                return;
            }
            if (sohn.classList.contains('expanded')) {
                reset();
            } else {
                expand('sohn');
            }
        });
    }

    if (vaterTab) {
        vaterTab.addEventListener('click', (e) => {
            e.stopPropagation();
            reset();
        });
    }
    if (sohnTab) {
        sohnTab.addEventListener('click', (e) => {
            e.stopPropagation();
            reset();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') reset();
    });
});

(function(){
    const overlay = document.getElementById('triggerOverlay');
    const btnClose = document.getElementById('triggerClose');

    if (!overlay || !btnClose) return;

    // Popup sichtbar und Fokus setzen; Hintergrundscroll sperren
    overlay.classList.remove('hidden');
    const modal = overlay.querySelector('.trigger-modal');
    if (modal) modal.focus();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    function closeTrigger(){
        overlay.classList.add('hidden');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Schließen bei Button-Klick
    btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTrigger();
    });

    // Klick außerhalb schließt
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeTrigger();
    });

    // Escape schließt
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeTrigger();
    });
})();
