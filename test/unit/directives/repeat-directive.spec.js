
/**
 * Test `scRepeatDirective`.
 */

describe('scRepeatDirective', function() {
  var $compile;
  var $rootScope;
  var $scope;

  beforeEach(module('scRepeat'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  function createElement(template) {
    $compile(template)($scope);

    $rootScope.$digest();
  }

  it('should throw an error if a collection isn\'t provided', function() {
    try {
      createElement(multiline(function() {/*
        <div>
          <sc-repeat></sc-repeat>
        </div>
      */}));

      should.fail();
    } catch(e) {
      e.should.be.instanceOf(Error);
      e.message.should.equal('You need to provide a collection.');
    }
  });

  it('should throw an error if a item is passed without a key', function() {
    try {
      $scope.collection = {
        'item_1': 'value_1',
        'item_2': 'value_2'
      };

      createElement(multiline(function() {/*
        <div>
          <sc-repeat sc-repeat-collection="collection">
            <sc-item></sc-item>
          </sc-repeat>
        </div>
      */}));

      should.fail();
    } catch(e) {
      e.should.be.an.instanceOf(Error);
      e.message.should.equal('You need to provide a `key`.');
    }
  });

  it('should allow using it as an attribute directive', function(done) {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'value_2'
    };

    createElement(multiline(function() {/*
      <div>
        <div sc-repeat="collection">
          <div sc-item="item_2"></sc-item>
        </sc-repeat>
      </div>
    */}));

    done();
  });

  it('should remove item from collection', function() {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'value_2'
    };

    createElement(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection">
          <sc-item sc-item-key="item_2"></sc-item>
        </sc-repeat>
      </div>
    */}));

    $scope.scRepeat.collection.should.be.an.instanceOf(Object);
    $scope.scRepeat.collection.should.have.property('item_1');
    $scope.scRepeat.collection.should.not.have.property('item_2');
  });

  it('should update `scRepeat.collection` if passed collection changes', function() {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'value_2'
    };

    createElement(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection"></sc-repeat>
      </div>
    */}));

    $scope.scRepeat.collection['item_1'].should.equal('value_1');

    $scope.$apply(function() {
      $scope.collection = {
        'item_1': 'new_value_1',
        'item_2': 'value_2'
      };
    });

    $scope.scRepeat.collection['item_1'].should.equal('new_value_1');

    $scope.$apply(function() {
      $scope.collection = {
        'item_1': 'new_value',
        'item_2': 'value_2'
      };
    });

    $scope.scRepeat.collection['item_1'].should.equal('new_value');
  });

  it('should play nice with `ngIf` directive and remove element from collection', function() {
    $scope.collection = {
      'item_1': 'value_1'
    };

    $scope.test = false;

    createElement(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection">
          <sc-item sc-item-key="item_1" ng-if="test"></sc-item>
        </sc-repeat>
      </div>
    */}));

    $scope.scRepeat.collection.should.not.have.property('item_1');

    $scope.$apply('test = true');

    $scope.scRepeat.collection.should.not.have.property('item_1');
  });
});
