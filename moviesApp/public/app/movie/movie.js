function movieController($scope, $mdDialog, $http) {
    var ctrl = this;

    ctrl.movies = {};

    $http.get("/movies/getall")
        .then(function (response) {
            // First function handles success
            ctrl.movies = response.data;
        }, function (response) {
            // Second function handles error
            alert(response.statusText);
            ctrl.movies = {
                1: {title: "Matrix", rating: 9., nbNotes: 100, index: 1},
                2: {title: "Back To the Future", rating: 9., nbNotes: 1, index: 2},
                3: {title: "Star Trek", rating: 7., nbNotes: 6, index: 3},
                4: {title: "Star Wars V", rating: 10., nbNotes: 100000, index: 4},
            };
        });

    ctrl.showAlert = function (ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Rating')
                .textContent('Update done')
                .ariaLabel('Alert Dialog Demo')
                .ok('Done')
                .targetEvent(ev)
        );
    };

    ctrl.update = function (movie, rating, $event) {
        if (rating > -1 && rating < 11) {
            movie.rating = (parseFloat(rating) + movie.rating * movie.nbNotes) / (movie.nbNotes + 1);
            movie.nbNotes++;
            $http.post("/movies/" + movie.index + "/update", JSON.stringify({
                nbNotes: movie.nbNotes,
                rating: movie.rating
            }))
                .then(function (response) {
                    ctrl.showAlert($event);
                }, function (response) {
                    // Second function handles error
                    alert(response.status);
                });
        }
    }
}

movieApp.component("movie", {
    templateUrl: "app/movie/movie.html",
    controller: movieController
});