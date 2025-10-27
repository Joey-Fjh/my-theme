class SearchDrawer extends HTMLElement{
    constructor(){
        super();

        this.searchResults = this.querySelector(".results");
        this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
        this.querySelector('#SearchDrawer-Overlay').addEventListener('click', this.close.bind(this));
    
        this.setHeaderSearchIconAccessibility();
        this.setResetButton();
        this.setSearchResult();
    }

    setHeaderSearchIconAccessibility(){
        const searchLink = document.querySelector('#search-icon-drawer');
        
        if(!searchLink) return;

        searchLink.setAttribute('role', 'button');
        searchLink.setAttribute('aria-haspopup', 'dialog');

        searchLink.addEventListener('click', (event) => {
            event.preventDefault();
            this.open();
        });
        searchLink.addEventListener('keydown', (event) => {
            if (event.code.toUpperCase() === 'SPACE') {
                event.preventDefault();
                this.open();
            }
        });
    }

    setResetButton(){
        this.resetButton = this.querySelector('button[type="reset"]');
    }

    setSearchResult(){
        this.loadingDom = this.querySelector(".search__loading");
        this.defaultDom = this.querySelector(".default");

        this.input = this.querySelector('input[type="search"]');
        if(this.input){
            this.input.form.addEventListener('reset', this.onFormReset.bind(this));
            this.input.addEventListener(
                'input',
                debounce(() => {
                    this.onChange();
                }, 300).bind(this)
            );
        }

        this.searchTerm = '';
        this.cachedResults = {};
        this.abortController = new AbortController();

        this.input.form.addEventListener('submit', this.onFormSubmit.bind(this));
        this.input.addEventListener('focus', this.onFocus.bind(this));
        this.addEventListener('focusout', this.onFocusOut.bind(this));
    }

    onChange(){
        this.toggleResetButton()

        const newSearchTerm = this.getQuery();

        if (!this.searchTerm || !newSearchTerm.startsWith(this.searchTerm)) {
            // 清除旧的搜索结果，如果搜索词已改变 或 第一次打开
            // this.querySelector('#predictive-search-results-groups-wrapper')?.remove();
        }

        this.updateSearchForTerm(this.searchTerm, newSearchTerm);
        this.searchTerm = newSearchTerm;

        if (!this.searchTerm.length) {
            this.closeSearch();
            return;
        }

        this.defaultDom.classList.add('hidden');
        this.getSearchResults(this.searchTerm);
    }

    onFocus() {
        const currentSearchTerm = this.getQuery();

        if (!currentSearchTerm.length) return;

        if (this.searchTerm !== currentSearchTerm) {
            this.onChange();
        } else if (this.getAttribute('results') === 'true') {
            this.openSearch();
        } else {
            this.getSearchResults(this.searchTerm);
        }
    }

    onFocusOut() {
        setTimeout(() => {
            // 查询抽屉失去焦点时，关闭
            // if (!this.contains(document.activeElement)) this.close();
        });
    }

    updateSearchForTerm(previousTerm, newTerm) {
        // 更新当前搜索的展示文本：Search For ‘搜索词’
        const searchForTextElement = this.querySelector('[data-predictive-search-search-for-text]');
        const currentButtonText = searchForTextElement?.innerText;

        if (currentButtonText) {
            if (currentButtonText.match(new RegExp(previousTerm, 'g')).length > 1) {
                // The new term matches part of the button text and not just the search term, do not replace to avoid mistakes
                return;
            }
            
            const newButtonText = currentButtonText.replace(previousTerm, newTerm);
            searchForTextElement.innerText = newButtonText;
        }
    }

    renderSearchResults(resultsMarkup) {
        this.setAttribute('results', true);

        this.searchResults.innerHTML = resultsMarkup;
        // this.openSearch();
    }

    getSearchResults(searchTerm){
        const queryKey = searchTerm.replace(' ', '-').toLowerCase();

        if (this.cachedResults[queryKey]) {
            this.renderSearchResults(this.cachedResults[queryKey]);
            return; 
        }

        this.loadingDom.classList.remove('hidden');

        fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&section_id=search-result`, {
            signal: this.abortController.signal,
        })
        .then((response) => {
            if (!response.ok) {
                let error = new Error(response.status);
                
                this.closeSearch(); 
                throw error;
            }
        
            return response.text();
        })
        .then((text) => {
            const resultsMarkup = new DOMParser()
                .parseFromString(text, 'text/html')
                .querySelector('#shopify-section-search-result').innerHTML;
            
            this.loadingDom.classList.add('hidden');
            this.renderSearchResults(resultsMarkup);
        })
        .catch((error) => {
            if (error?.code === 20) {
                // Code 20 means the call was aborted
                return;
            }

            this.closeSearch();
            throw error;
        });
    }

    getQuery() {
        return this.input.value.trim();
    }

    onFormSubmit(event) {
        if(!this.getQuery().length) event.preventDefault();
    }

    toggleResetButton() {
        const resetIsHidden = this.resetButton.classList.contains('hidden');

        if (this.input.value.length > 0 && resetIsHidden) {
            this.resetButton.classList.remove('hidden');
        } else if (this.input.value.length === 0 && !resetIsHidden) {
            this.resetButton.classList.add('hidden');
        }
    }

    onFormReset(event) {
        event.preventDefault();
       
        this.input.value = '';
        this.input.focus();
        this.toggleResetButton();

        this.searchTerm = '';
        this.abortController.abort();
        this.abortController = new AbortController();
        this.closeSearch();
    }
    
    open(){
        setTimeout(() => {
            this.classList.remove('search-container__close');
            this.classList.add('search-container__active');
        });

        // 这里要处理焦点的逻辑
        this.addEventListener(
            'transitionend',
            () => {
                // document.activeElement = this;
                trapFocus(this,  this.querySelector('#SearchDrawer'));
            },
            { once: true }
        );

        document.body.classList.add('overflow-hidden');
    }

    close(){
        this.classList.remove('search-container__active');
        this.classList.add('search-container__close');

        document.body.classList.remove('overflow-hidden');
    }

    openSearch(){
        this.setAttribute('open',true);
        this.defaultDom.classList.add('hidden');
    }

    closeSearch(){
        this.removeAttribute('results');
        this.defaultDom.classList.remove('hidden');
        this.searchResults.innerHTML = null;
    }
}

customElements.define('search-drawer', SearchDrawer);