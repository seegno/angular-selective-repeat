
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

  it('should remove item from collection', function() {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'bar'
    };

    var template = $compile(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection">
          <sc-item sc-item-key="item_2"></sc-item>
        </sc-repeat>
      </div>
    */}))($scope);

    $rootScope.$digest();

    _.size($scope.scRepeat.collection).should.equal(1);
  });

  it('should create `n` repeat-rest elements', function() {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'bar'
    };

    var template = $compile(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection">
          <sc-repeat-rest></sc-repeat-rest>
        </sc-repeat>
      </div>
    */}))($scope);

    $rootScope.$digest();

    template.find('sc-repeat-rest').find('div').should.have.lengthOf(2);
  });

  it('should create `n - m` <sc-repeat-rest> direct child elements if `m` <sc-items> are included', function() {
    $scope.collection = {
      'item_1': 'value_1',
      'item_2': 'bar',
      'item_3': 'bar_2'
    };

    var template = $compile(multiline(function() {/*
      <div>
        <sc-repeat sc-repeat-collection="collection">
          <sc-item sc-item-key="item_1"></sc-item>
          <sc-repeat-rest></sc-repeat-rest>
        </sc-repeat>
      </div>
    */}))($scope);

    $rootScope.$digest();

    template.find('sc-repeat-rest').find('div').should.have.lengthOf(2);
  });
});
