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

    const starLeon = document.getElementById('startLeon');
    if (startLeon) {
        startLeon.addEventListener('click', (e) => {
            e.stopPropagation();
            const side = e.target.closest('#sohn') ? 'sohn' : (e.target.closest('#vater') ? 'vater' : null);
            if (side) expand(side);
            const target = document.getElementById('scrollLeon');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.hash = 'scrollLeon';
            }
        });
    }

    // Verschwinden des Hover-Effekts auf Touch-Geräten
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


