function compoController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.update = function (movie, rating) {
        ctrl.onUpdate({movie: movie, rating: rating});
    }
}

movieApp.component("movieComponent", {
    bindings: {
      onUpdate: '&',
        movie: '<',
        rating: '@'
    },
    templateUrl: "app/component/component.html",
    controller: compoController
});