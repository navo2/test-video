(function() {
    var single = angular.module('single_module', []);
    single.controller("HitsController", ['$http', function($http) {
        var hits_ctrl = this;
        this.values = {
            base_url: '',
            article_id: '',
            hits: '0'
        };

        this.values.base_url = base_url();
        this.values.article_id = getArticleID();
        this.values.hits = getHits();

        this.updateHits = function(articleid) {
            $http({
                    method: 'POST',
                    url: static_url() + 'staticfeeds/hits',
                    data: $.param({
                        articleid: articleid
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function(data) {
                    // hits_ctrl.values.hits = data.respond;
                    console.log(data);
                })
                .error(function(msg) {
                    // alert('Enexpected Error Occured');
                    console.log(msg);
                });
        };

        this.updateHits(this.values.article_id);
    }]);


    var search = angular.module('search_module', []);
    search.controller("SearchController", ['$http', function($http) {
        this.values = {
            keywords: '',
            category: '0',
            sort: 'relevance',
            order: 'ASC',
            datefrom: '0',
            dateto: '0',
            start: 0
        };
        this.search_results = {
            count: 0
        };
        this.loading = false;
        var search_ctrl = this;
        this.searchArticles = function(start) {
            search_ctrl.values.start = start;
            search_ctrl.loading = true;
            $http({
                    method: 'POST',
                    url: static_url() + 'home/search',
                    data: $.param(search_ctrl.values),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .success(function(data) {
                    search_ctrl.search_results = data;
                    console.log(data);
                    search_ctrl.loading = false;
                })
                .error(function(msg) {
                    // alert('Enexpected Error Occured');
                    console.log(msg);
                    search_ctrl.loading = false;
                });
        };
    }]);
})();