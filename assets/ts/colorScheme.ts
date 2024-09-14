type colorScheme = 'light' | 'dark';

class StackColorScheme {
    private localStorageKey = 'irmabaitussalam-theme';
    private currentScheme: colorScheme;
    private systemPreferScheme: colorScheme;

    constructor(toggleEl: HTMLElement) {
        this.bindMatchMedia();
        this.currentScheme = this.getSavedScheme();

        this.dispatchEvent(document.documentElement.dataset.scheme as colorScheme);

        if (toggleEl)
            this.bindClick(toggleEl);

        if (document.body.style.transition == '')
            document.body.style.setProperty('transition', 'background-color .3s ease');
    }

    private saveScheme() {
        localStorage.setItem(this.localStorageKey, this.currentScheme);
    }

    private bindClick(toggleEl: HTMLElement) {
        toggleEl.addEventListener('click', (e) => {
            if (this.isDark()) {
                this.currentScheme = 'light';
            }
            else {
                this.currentScheme = 'dark';
            }

            this.setBodyClass();
            this.saveScheme();
        });
    }

    private isDark() {
        return this.currentScheme == 'dark';
    }

    private dispatchEvent(colorScheme: colorScheme) {
        const event = new CustomEvent('onColorSchemeChange', {
            detail: colorScheme
        });
        window.dispatchEvent(event);
    }

    private setBodyClass() {
        if (this.isDark()) {
            document.documentElement.dataset.scheme = 'dark';
        }
        else {
            document.documentElement.dataset.scheme = 'light';
        }

        this.dispatchEvent(document.documentElement.dataset.scheme as colorScheme);
    }

    private getSavedScheme(): colorScheme {
        const savedScheme = localStorage.getItem(this.localStorageKey);                                               
        if (savedScheme == 'light' || savedScheme == 'dark') return savedScheme;
        else return 'light';
    }

    private bindMatchMedia() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                this.systemPreferScheme = 'dark';
            }
            else {
                this.systemPreferScheme = 'light';
            }
            this.setBodyClass();
        });
    }
}

export default StackColorScheme;
