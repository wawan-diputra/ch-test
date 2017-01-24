var app = angular.module('myTestApp', ['ngRoute', 'ngResource', 'angularMoment']).run(function($rootScope, $http) {
  $rootScope.authenticated = false;
  $rootScope.currentUser = '';
  $rootScope.currentUserId = '';

  $rootScope.signout = function() {
    $http.get('/auth/signout');

    $rootScope.authenticated = false;
    $rootScope.currentUser = '';
    $rootScope.currentUserId = '';
  }
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'trl.html',
      controller: 'trlCtrl'
    })
    .when('/users', {
      templateUrl: 'users.html',
      controller: 'userController'
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    .when('/register', {
      templateUrl: 'reg.html',
      controller: 'regController'
    })
    .otherwise({ redirectTo: '/' });
});

app.factory('postService', function($resource) {
  return $resource('/api/posts/:id', null, { update: { method: 'PUT' } });
})

app.factory('userService', function($resource) {
  return $resource('/users/:id', null, { update: { method: 'PUT' } });
})
app.factory('usearchService', function($resource) {
  return $resource('/users/find/:id', null, { update: { method: 'PUT' } });
})

app.run(function($rootScope, $location, $http, postService) {
  $http.get('/auth/check/').success(function(data) {
    if (data.state == 'success') {
      $rootScope.authenticated = true;
      $rootScope.currentUser = data.user.username;
      $rootScope.currentUserId = data.user._id;
    } else {
      $rootScope.authenticated = false;
      $rootScope.currentUser = '';
      $rootScope.currentUserId = '';
    }
  });
})

app.controller('trlCtrl', function($scope, $compile, $http) {
  String.prototype.toTimeFormat = function() {
    seconds = Math.floor(parseInt(this) / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);

    r = '';

    if (days > 0) { r = r + days + ' days '; }
    if (hours > 0) { r = r + hours + ' hours '; }
    if (minutes > 0) { r = r + minutes + ' minutes '; }

    return r;
  }

  $scope.trlData = JSON.parse('[{"id":"587d74403c843ef988f1ce89","name":"Job Offered","closed":false,"idBoard":"587d742beee58b5fd86d1ce6","pos":65535.5,"subscribed":false,"cards":[{"id":"587d7b96fff56bc005ab5d65","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":"2017-01-21T05:00:00.000Z","dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-18T07:44:36.949Z","desc":"","descData":null,"due":"2017-01-21T05:00:00.000Z","dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d74403c843ef988f1ce89","idMembers":[],"idShort":2,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Goofy / AN Java","pos":327679,"shortUrl":"https://trello.com/c/VXjlXpdL","url":"https://trello.com/c/VXjlXpdL/2-goofy-an-java","actions":[{"id":"587f1ce4befd406da32628e2","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"VXjlXpdL","idShort":2,"name":"Goofy / AN Java","id":"587d7b96fff56bc005ab5d65","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-18T07:44:36.931Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"587f1c98d44340237f649e59","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"VXjlXpdL","idShort":2,"name":"Goofy / AN Java","id":"587d7b96fff56bc005ab5d65","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-18T07:43:20.076Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587ef07d26d2f7f005c046b9","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-24T03:50:52.061Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d74403c843ef988f1ce89","idMembers":[],"idShort":11,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Rizki Ekaputri Amalia / JP WFE","pos":376831,"shortUrl":"https://trello.com/c/3FNy8Hop","url":"https://trello.com/c/3FNy8Hop/11-rizki-ekaputri-amalia-jp-wfe","actions":[{"id":"5886cf1c0f7e28546df637cd","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"3FNy8Hop","idShort":11,"name":"Rizki Ekaputri Amalia / JP WFE","id":"587ef07d26d2f7f005c046b9","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-24T03:50:52.036Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5886cf184b60d00b4b7e373f","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"3FNy8Hop","idShort":11,"name":"Rizki Ekaputri Amalia / JP WFE","id":"587ef07d26d2f7f005c046b9","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-24T03:50:48.720Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"588038c6560de778a007386b","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"3FNy8Hop","idShort":11,"name":"Rizki Ekaputri Amalia / JP WFE","id":"587ef07d26d2f7f005c046b9","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-19T03:55:50.020Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587d7ba58a64f22afc2d9ea3","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-23T01:56:03.376Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d74403c843ef988f1ce89","idMembers":[],"idShort":4,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Kralabella / AN JavaScript","pos":425983,"shortUrl":"https://trello.com/c/zgft6P7J","url":"https://trello.com/c/zgft6P7J/4-kralabella-an-javascript","actions":[{"id":"588562b3fafa17ffb77bd195","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"zgft6P7J","idShort":4,"name":"Kralabella / AN JavaScript","id":"587d7ba58a64f22afc2d9ea3","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T01:56:03.357Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"587efefbdf159a4c0c41c032","idMemberCreator":"585b456b3860fc046105656b","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"zgft6P7J","idShort":4,"name":"Kralabella / AN JavaScript","id":"587d7ba58a64f22afc2d9ea3","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-18T05:36:59.939Z","memberCreator":{"id":"585b456b3860fc046105656b","avatarHash":"dc7d3fbcb49ac9555cd5be876df6d164","fullName":"wawan-diputra","initials":"W","username":"wawandiputra"}}]}]},{"id":"587d7446bee53d1906e0909d","name":"Talent Pool","closed":false,"idBoard":"587d742beee58b5fd86d1ce6","pos":131071,"subscribed":false,"cards":[{"id":"587d7b9c5327e798899443ed","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-19T06:49:02.443Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d7446bee53d1906e0909d","idMembers":[],"idShort":3,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Gober / PG Python","pos":102399,"shortUrl":"https://trello.com/c/1LFp1mp6","url":"https://trello.com/c/1LFp1mp6/3-gober-pg-python","actions":[{"id":"5880615eeeec55227134d5ac","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"1LFp1mp6","idShort":3,"name":"Gober / PG Python","id":"587d7b9c5327e798899443ed","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-19T06:49:02.382Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587ec134a173ae701a0a6309","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":true,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-23T06:40:49.586Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":["587d742bced82109ffcad8b9","587d742bced82109ffcad8b7"],"idList":"587d7446bee53d1906e0909d","idMembers":["5847664c15b7d45a93edd5b8"],"idShort":8,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[{"id":"587d742bced82109ffcad8b7","idBoard":"587d742beee58b5fd86d1ce6","name":"","color":"yellow","uses":1},{"id":"587d742bced82109ffcad8b9","idBoard":"587d742beee58b5fd86d1ce6","name":"","color":"red","uses":1}],"name":"Tony Stark / AN Java","pos":105471,"shortUrl":"https://trello.com/c/gsuPm7BO","url":"https://trello.com/c/gsuPm7BO/8-tony-stark-an-java","actions":[{"id":"5885a57179199a0642a3a404","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"gsuPm7BO","idShort":8,"name":"Tony Stark / AN Java","id":"587ec134a173ae701a0a6309","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T06:40:49.567Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881acb967d79d3f39ec7197","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"gsuPm7BO","idShort":8,"name":"Tony Stark / AN Java","id":"587ec134a173ae701a0a6309","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T06:22:49.907Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881acaf3b3a2daf0e7518e3","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"gsuPm7BO","idShort":8,"name":"Tony Stark / AN Java","id":"587ec134a173ae701a0a6309","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-20T06:22:39.341Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58818acef3eaa0adee530aa4","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"gsuPm7BO","idShort":8,"name":"Tony Stark / AN Java","id":"587ec134a173ae701a0a6309","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T03:58:06.244Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587d7b8dc426e7b411e6593c","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-23T01:45:34.339Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d7446bee53d1906e0909d","idMembers":[],"idShort":1,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Donald Bebek / AP C++","pos":108543,"shortUrl":"https://trello.com/c/5PXNu0bC","url":"https://trello.com/c/5PXNu0bC/1-donald-bebek-ap-c","actions":[{"id":"5885603e3c26216a970b6b14","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T01:45:34.310Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5885603cc150afac6464a68b","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-23T01:45:32.237Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58855f78778430fbb64f19f4","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T01:42:16.507Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58855f756cb8538697506134","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-23T01:42:13.931Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5885515593e9c9bd2dec5dae","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-23T00:41:57.951Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881cb782e55dac733047643","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T08:34:00.017Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881cb75cca42cc1ca217cc2","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-20T08:33:57.434Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881ae3f4c06ef8f80a5a023","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T06:29:19.852Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881adc5c3762d180f73b979","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Bebek / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-20T06:27:17.640Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"587f1ce280a0b44cdae313ae","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Duck / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-18T07:44:34.603Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"587f1c96c4f2ac39cabdd0cc","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"5PXNu0bC","idShort":1,"name":"Donald Duck / AP C++","id":"587d7b8dc426e7b411e6593c","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-18T07:43:18.818Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587f0b0ec7ff69696c7105ee","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-23T01:56:06.720Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587d7446bee53d1906e0909d","idMembers":[],"idShort":12,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Johnny Bravo / AN JavaScript","pos":111615,"shortUrl":"https://trello.com/c/wQ7X3urp","url":"https://trello.com/c/wQ7X3urp/12-johnny-bravo-an-javascript","actions":[{"id":"588562b68338fce10b72b655","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"wQ7X3urp","idShort":12,"name":"Johnny Bravo / AN JavaScript","id":"587f0b0ec7ff69696c7105ee","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T01:56:06.693Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58855f7a31391419b2b54508","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"wQ7X3urp","idShort":12,"name":"Johnny Bravo / AN JavaScript","id":"587f0b0ec7ff69696c7105ee","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-23T01:42:18.268Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5881cb793e801cb20fca2dac","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"wQ7X3urp","idShort":12,"name":"Johnny Bravo / AN JavaScript","id":"587f0b0ec7ff69696c7105ee","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-20T08:34:01.351Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58818b36a8c720b7b309f653","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"wQ7X3urp","idShort":12,"name":"Johnny Bravo / AN JavaScript","id":"587f0b0ec7ff69696c7105ee","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-20T03:59:50.124Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]}]},{"id":"587dae4dad14f776059b8551","name":"New Recruit","closed":false,"idBoard":"587d742beee58b5fd86d1ce6","pos":196607,"subscribed":false,"cards":[{"id":"587d7bad8f679a8d042f4c22","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-24T00:57:58.845Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587dae4dad14f776059b8551","idMembers":[],"idShort":5,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Robert Jhonson Kimberly Junior / AP MEAN Stack","pos":8191.9140625,"shortUrl":"https://trello.com/c/qNTjhrKe","url":"https://trello.com/c/qNTjhrKe/5-robert-jhonson-kimberly-junior-ap-mean-stack","actions":[{"id":"5886a69695551e452be6c0f9","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"qNTjhrKe","idShort":5,"name":"Robert Jhonson Kimberly Junior / AP MEAN Stack","id":"587d7bad8f679a8d042f4c22","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-24T00:57:58.830Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"5886a683bfec0f417587a1d9","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"qNTjhrKe","idShort":5,"name":"Robert Jhonson Kimberly Junior / AP MEAN Stack","id":"587d7bad8f679a8d042f4c22","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587d74403c843ef988f1ce89"}},"type":"updateCard","date":"2017-01-24T00:57:39.511Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"588562b29de7e816af8fd8fc","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Job Offered","id":"587d74403c843ef988f1ce89"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"qNTjhrKe","idShort":5,"name":"Robert Jhonson Kimberly Junior / AP MEAN Stack","id":"587d7bad8f679a8d042f4c22","idList":"587d74403c843ef988f1ce89"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-23T01:56:02.102Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58815f2b2b827da528bbaa34","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"qNTjhrKe","idShort":5,"name":"Robert Jhonson Kimberly Junior / AP MEAN Stack","id":"587d7bad8f679a8d042f4c22","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T00:51:55.984Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587ef04e5f984339e5d548e9","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-23T01:34:56.602Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587dae4dad14f776059b8551","idMembers":[],"idShort":9,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Viet Dinh / AN Python","pos":16383.828125,"shortUrl":"https://trello.com/c/nDtHcGbF","url":"https://trello.com/c/nDtHcGbF/9-viet-dinh-an-python","actions":[{"id":"58855dc0c80de4eca4e1046e","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"nDtHcGbF","idShort":9,"name":"Viet Dinh / AN Python","id":"587ef04e5f984339e5d548e9","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-23T01:34:56.586Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"587db0cf0251e55cfd732469","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-20T01:54:17.881Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":["587d742bced82109ffcad8bb"],"idList":"587dae4dad14f776059b8551","idMembers":[],"idShort":7,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[{"id":"587d742bced82109ffcad8bb","idBoard":"587d742beee58b5fd86d1ce6","name":"MVP","color":"blue","uses":1}],"name":"Carl Johnson / AP C#","pos":65535.3125,"shortUrl":"https://trello.com/c/FeZ39nNf","url":"https://trello.com/c/FeZ39nNf/7-carl-johnson-ap-c","actions":[{"id":"58816dc947909e6464ded4e6","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"FeZ39nNf","idShort":7,"name":"Carl Johnson / AP C#","id":"587db0cf0251e55cfd732469","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-20T01:54:17.861Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}},{"id":"58816d82b28714e5d761267a","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"listBefore":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"FeZ39nNf","idShort":7,"name":"Carl Johnson / AP C#","id":"587db0cf0251e55cfd732469","idList":"587d7446bee53d1906e0909d"},"old":{"idList":"587dae4dad14f776059b8551"}},"type":"updateCard","date":"2017-01-20T01:53:06.269Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]},{"id":"58815f1c7df3ad9f5e0bc6b0","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-20T00:51:40.024Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587dae4dad14f776059b8551","idMembers":[],"idShort":13,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Raymond Reddington / AP C","pos":327679,"shortUrl":"https://trello.com/c/ZHMheKxm","url":"https://trello.com/c/ZHMheKxm/13-raymond-reddington-ap-c","actions":[]},{"id":"587ef06735468f6ee144899b","badges":{"votes":0,"viewingMemberVoted":false,"subscribed":false,"fogbugz":"","checkItems":0,"checkItemsChecked":0,"comments":0,"attachments":0,"description":false,"due":null,"dueComplete":false},"checkItemStates":[],"closed":false,"dateLastActivity":"2017-01-24T03:52:06.684Z","desc":"","descData":null,"due":null,"dueComplete":false,"email":null,"idBoard":"587d742beee58b5fd86d1ce6","idChecklists":[],"idLabels":[],"idList":"587dae4dad14f776059b8551","idMembers":[],"idShort":10,"idAttachmentCover":null,"manualCoverAttachment":false,"labels":[],"name":"Trac Van Ky / AP C++","pos":393215,"shortUrl":"https://trello.com/c/gsf6ToIJ","url":"https://trello.com/c/gsf6ToIJ/10-trac-van-ky-ap-c","actions":[{"id":"5886cf66fde21a437d08c008","idMemberCreator":"5847664c15b7d45a93edd5b8","data":{"listAfter":{"name":"New Recruit","id":"587dae4dad14f776059b8551"},"listBefore":{"name":"Talent Pool","id":"587d7446bee53d1906e0909d"},"board":{"shortLink":"iNh2oE9z","name":"Recruitment 2017","id":"587d742beee58b5fd86d1ce6"},"card":{"shortLink":"gsf6ToIJ","idShort":10,"name":"Trac Van Ky / AP C++","id":"587ef06735468f6ee144899b","idList":"587dae4dad14f776059b8551"},"old":{"idList":"587d7446bee53d1906e0909d"}},"type":"updateCard","date":"2017-01-24T03:52:06.653Z","memberCreator":{"id":"5847664c15b7d45a93edd5b8","avatarHash":null,"fullName":"adrian yulianto","initials":"AY","username":"adrianyulianto"}}]}]}]');

  $scope.toDate = function(e) {
    var s = e.substring(0, 8);
    var p = parseInt(s, 16);
    var e = p * 1000;
    var d = new Date(e);
    // console.log(s+', '+p+', '+e+', '+d);
    return d.toISOString();
  }
  $scope.currentListIndex = 0;

  $http.get('/api/trl/').success(function(data) {
    // $scope.trlData = data;
    // console.log($scope.trlData);
  });

  $scope.getDistinctCardList = function(idCard, idList) {
  	if (!$scope.trlData[$scope.currentListIndex].cards[idCard].actions.length)
      return "0";
    else {
      var listArray = [];
      $scope.trlData[$scope.currentListIndex].cards[idCard].actions.forEach(function(entry) {
      	if(listArray.indexOf() < 0){
      		listArray[entry.data.listAfter.id] = {
      			name: entry.data.listAfter.name,
      			id: entry.data.listAfter.id,
      			total: $scope.getTotalSpend(idCard, entry.data.listAfter.id)
      		};
	    }
      });
      // console.log(listArray);
    }
  } 

  $scope.getTotal = function(idList){
    var totalTime = 0;
    if (!$scope.trlData[$scope.currentListIndex].cards.length)
      return "0";
    else {
      $scope.trlData[$scope.currentListIndex].cards.forEach(function(card,i){
        var currentList = "";
        var currentTime = new Date();
        var spendTime = 0;
        var tempSpend = "";
        var recordDate = "";
        var lastPosition = ""; // temp variable to capture very last LIST before it moved to another list
        var i = 0;
        if (!card.actions.length) {
          var e = card.id;
          var s = e.substring(0, 8);
          var p = parseInt(s, 16);
          var e = p * 1000;
          var d = new Date(e);

          tempSpend = currentTime.getTime() - d.getTime();
          spendTime = parseInt(spendTime) + parseInt(tempSpend);
          totalTime += spendTime;
        }else{
          card.actions.forEach(function(entry) {
            // i++;
            if (currentList !== entry.data.listAfter.id && entry.data.listAfter.id === idList) {
              tempSpend = currentTime.getTime() - new Date(entry.date).getTime();
              currentTime = new Date(entry.date);
              spendTime = parseInt(spendTime) + parseInt(tempSpend);
              //console.log("OK", entry.data.listAfter.id, new Date(entry.date));
              //console.log("SPEND", (tempSpend/1000).toString().toHHMMSS());
            } else {
              currentTime = new Date(entry.date);
              //console.log(entry.data.listAfter.id, new Date(entry.date));
            }
            lastPosition = entry.data.listBefore.id;
          });

          //calc spend time from the first time card created until moved to the second list.
          if (lastPosition === idList) {
            
            var e = card.id;
            var s = e.substring(0, 8);
            var p = parseInt(s, 16);
            var e = p * 1000;
            var d = new Date(e);

            tempSpend = currentTime.getTime() - d.getTime();
            spendTime = parseInt(spendTime) + parseInt(tempSpend);
          }
        }
        totalTime += spendTime;
        //console.log($scope.trlData[$scope.currentListIndex].cards[idCard].name, (spendTime/1000).toString().toHHMMSS());
      })
    }
    return totalTime.toString().toTimeFormat();
  }

  $scope.getTotalSpend = function(idCard, idList) {
    //alert(idCard + " // " + idList);
    //console.log(idCard, b);
    if (!$scope.trlData[$scope.currentListIndex].cards[idCard].actions.length)
      return "0";
    else {
      var currentList = "";
      var currentTime = new Date();
      var spendTime = 0;
      var tempSpend = "";
      var recordDate = "";
      var lastPosition = ""; // temp variable to capture very last LIST before it moved to another list
      var i = 0;
      $scope.trlData[$scope.currentListIndex].cards[idCard].actions.forEach(function(entry) {
        // i++;
        if (currentList !== entry.data.listAfter.id && entry.data.listAfter.id === idList) {
          tempSpend = currentTime.getTime() - new Date(entry.date).getTime();
          currentTime = new Date(entry.date);
          spendTime = parseInt(spendTime) + parseInt(tempSpend);
          //console.log("OK", entry.data.listAfter.id, new Date(entry.date));
          //console.log("SPEND", (tempSpend/1000).toString().toHHMMSS());
        } else {
          currentTime = new Date(entry.date);
          //console.log(entry.data.listAfter.id, new Date(entry.date));
        }
        lastPosition = entry.data.listBefore.id;
      });

      //calc spend time from the first time card created until moved to the second list.
      if (lastPosition === idList) {
      	
      	var e = $scope.trlData[$scope.currentListIndex].cards[idCard].id;
      	var s = e.substring(0, 8);
	    var p = parseInt(s, 16);
	    var e = p * 1000;
	    var d = new Date(e);

        tempSpend = currentTime.getTime() - d.getTime();
        spendTime = parseInt(spendTime) + parseInt(tempSpend);
      }

      //console.log($scope.trlData[$scope.currentListIndex].cards[idCard].name, (spendTime/1000).toString().toHHMMSS());
      return spendTime.toString().toTimeFormat();
    }
  }

  $scope.savedListIndex = function(idList) {
    $scope.currentListIndex = idList;
  }
})


app.directive('listhistory', function($compile){
  return{
     // A = attribute, E = Element, C = Class and M = HTML Comment
    restrict:'E',
    scope:{
      list:'=list',
      // index:'=index'
    },
     //The link function is responsible for registering DOM listeners as well as updating the DOM.
    link: function($scope, $element, $attrs) {

      $scope.getTotalSpend = function(idCard, idList) {
        //alert(idCard + " // " + idList);
        //console.log(idCard, b);
        if (!$scope.list.cards[idCard].actions.length)
          return "0";
        else {
          var currentList = "";
          var currentTime = new Date();
          var spendTime = 0;
          var tempSpend = "";
          var recordDate = "";
          var lastPosition = ""; // temp variable to capture very last LIST before it moved to another list
          var i = 0;
          $scope.list.cards[idCard].actions.forEach(function(entry) {
            // i++;
            if (currentList !== entry.data.listAfter.id && entry.data.listAfter.id === idList) {
              tempSpend = currentTime.getTime() - new Date(entry.date).getTime();
              currentTime = new Date(entry.date);
              spendTime = parseInt(spendTime) + parseInt(tempSpend);
              //console.log("OK", entry.data.listAfter.id, new Date(entry.date));
              //console.log("SPEND", (tempSpend/1000).toString().toHHMMSS());
            } else {
              currentTime = new Date(entry.date);
              //console.log(entry.data.listAfter.id, new Date(entry.date));
            }
            lastPosition = entry.data.listBefore.id;
          });

          //calc spend time from the first time card created until moved to the second list.
          if (lastPosition === idList) {
            
            var e = $scope.list.cards[idCard].id;
            var s = e.substring(0, 8);
            var p = parseInt(s, 16);
            var e = p * 1000;
            var d = new Date(e);

            tempSpend = currentTime.getTime() - d.getTime();
            spendTime = parseInt(spendTime) + parseInt(tempSpend);
          }

          //console.log($scope.trlData[$scope.currentListIndex].cards[idCard].name, (spendTime/1000).toString().toHHMMSS());
          return spendTime.toString().toTimeFormat();
        }
      }

      $scope.listArray = [];
      if (!$scope.list.cards[$attrs.index].actions.length)
        return "0";
      else {
        var item = '<span>history:</span>';
        $scope.list.cards[$attrs.index].actions.forEach(function(entry) {
          if($scope.listArray.indexOf() < 0){
            $scope.listArray[entry.data.listAfter.id] = {
              name: entry.data.listAfter.name,
              id: entry.data.listAfter.id,
              total: $scope.getTotalSpend($attrs.index, entry.data.listAfter.id)
            };
          }
          item += '<span class="hist">' + 'in <span class="name">' + entry.data.listAfter.name +'</span> for <span class="total">'+ $scope.getTotalSpend($attrs.index, entry.data.listAfter.id) + '</span></span>';
        });

        // console.log($scope.listArray);
        // var elem = angular.element(item);
        var c = $compile(item)($scope);
        console.log($scope.listArray)
        $element.append(c);
      }
    }
  }
})

// app.directive('draggable', function(){
//  return{
//      // A = attribute, E = Element, C = Class and M = HTML Comment
//      restrict:'A',
//      //The link function is responsible for registering DOM listeners as well as updating the DOM.
//      link: function(scope, element, attrs) {
//        // element.sortable({
//        //   revert: true
//        // });
//        element.draggable({
//          revert: true,
//          // helper: 'clone',
//          // connectToSortable: element.closest('.commentDiv')
//        });
//      }
//  }
// })

// app.directive('droppable', function($compile){
// 	return{
// 	    restrict: 'A',
// 	    link: function($scope,element,attrs){
// 	      //This makes an element Droppable
// 	      element.droppable({
// 	        drop:function(event,ui) {
// 	          var dragIndex = angular.element(ui.draggable).data('index'),
// 	              dragEl = angular.element(ui.draggable).parent(),
// 	              dropEl = angular.element(this);
// 	          if (dragEl.data('index') != dropEl.data('index')) {
// 	          	var temp = {};
// 	          	$scope.trlData.map(function(e,i, arr){
// 	          		var elem = e;
// 	          		if (elem.id == dragEl.data('index')) {
// 	          			elem.cards.map(function(card, index, arr){
// 	          				if (card.id == dragIndex) {
// 	          					temp = card;
// 	          					arr.splice(index,1);
// 	          				}
// 	          			});
// 	          		}
// 	          		arr[i] = elem;
// 	          	})
// 	          	$scope.trlData.map(function(e,i, arr){
// 	          		var elem = e;
// 	          		if (elem.id == dropEl.data('index')) {
// 	          			elem.cards.push(temp);
// 	          		}
// 	          		arr[i] = elem;
// 	          	})
// 	          }
// 	          $scope.$apply();
// 	        }
// 	      });
// 	    }
// 	}
// })

app.controller('cmtCtrl',
  function($scope, $rootScope, postService, $compile) {
    $scope.comments = {};
    $scope.comments = postService.query();
    $scope.newComments = { text: '', created_at: '' };

    $scope.post = function() {
      $scope.newComments.created_by = $rootScope.currentUser;
      $scope.newComments.created_at = Date.now();

      postService.save($scope.newComments, function() {
        $scope.newComments = { text: '', created_at: '' };
        $scope.comments = postService.query();
      })
    }
    $scope.editPost = function(id) {

      $('.commentItem .contentEditor').each(function(i, e) {
        var val = $(this).attr('data-prev');
        var cont = '<span class="commentContent">' + val + '</span>';
        $(this).replaceWith($compile(cont)($scope))
      })

      var dest = $('#' + id).find('.commentContent');
      var content = dest.text();
      var elem = angular.element('<textarea data-prev="' + content + '" class="form-control commentContent contentEditor" ng-keypress="checkEdit($event)">' + content + '</textarea>' +
        '');
      dest.replaceWith($compile(elem)($scope))
    }
    $scope.checkEdit = function(e) {
      if (e.which === 13) {
        var elem = e.target;
        var val = $(elem).val();
        var cid = $(elem).parents('.commentItem').attr('id');

        var newComments = { text: val, created_by: $rootScope.currentUser };

        postService.update({ id: cid }, newComments, function() {
          var cont = '<span class="commentContent">{{comment.text}}</span>';
          $(elem).replaceWith($compile(cont)($scope));
          $scope.comments = postService.query();
        })
      }
    }
    $scope.deletePost = function(id) {
      postService.delete({ id: id }, function() {
        $scope.comments = postService.query();
      })
    }
  })

app.controller('userController',
  function($scope, $rootScope, $http, userService, usearchService, $location) {
    $http.get('/auth/check/').success(function(data) {
      if (data.state == 'failure') {

      }
    });
    $scope.uSearch_param = [{
      data: [],
      log: 'or'
    }, {
      data: [],
      log: 'or'
    }];
    $scope.user_cred = { _id: '', username: '', fullname: '', email: '', password: '' };

    $scope.userList = userService.query(
      // {username:'genji'}
    );

    $scope.uSearch = function() {
      console.log($scope.uSearch_param);
      // var par = JSON.stringify($scope.uSearch_param);

      // $scope.userList = usearchService.query(par);

      $http.post('/users/find', $scope.uSearch_param).success(function(data) {
        // console.log(data)
        if (data.state == 'failure') {

        } else {
          $scope.userList = data;
        }
      });
    }

    $scope.editUser = function(id) {
      $http.get('/users/' + id).success(function(data) {
        if (data.state == 'failure') {

        } else {
          $scope.user_cred._id = data._id;
          $scope.user_cred.username = data.username;
          $scope.user_cred.fullname = data.fullname;
          $scope.user_cred.email = data.email;
          // $('#modalUserEdit').modal('show');
          $('#modalUserEdit').modal('show');
        }
      });

    }
    $scope.confirmEdit = function(id) {
      userService.update({ id: $scope.user_cred._id }, $scope.user_cred, function() {
        $scope.user_cred = { _id: '', username: '', fullname: '', email: '', password: '' };
        $scope.userList = userService.query();
        $('#modalUserEdit').modal('hide');
      })
    }
    $scope.deleteUser = function(id) {
      $('#modalUserDelete').modal('show');
      $scope.user_id = data;
    }
    $scope.confirmDelete = function() {
      userService.delete({ id: scope.user_id }, function() {
        $scope.userList = userService.query();
      })
      $scope.user_id = '';
      $scope.userList = userService.query();
      $('#modalUserEdit').modal('hide');
    }
    $scope.clearForm = function(id) {
      $('#modalUserDelete').find('input').val('');
      $scope.user_cred = { _id: '', username: '', fullname: '', email: '', password: '' };
      $scope.user_id = '';

    }
  })

app.controller('authController',
  function($scope, $rootScope, $http, $location) {
    $scope.user = { username: '', password: '' };
    $scope.error_message = '';

    $scope.login = function() {
      $http.post('/auth/login', $scope.user).success(function(data) {
        if (data.state == "success") {
          $('.modal').modal('hide');
          $scope.user = { username: '', password: '' };
          $scope.error_message = '';
          $rootScope.authenticated = true;
          $rootScope.currentUser = data.user.username;
          $rootScope.currentUserId = data.user._id;
          $location.path('/');
        } else {
          $scope.error_message = data.message;
        }
      });
      // $scope.error_message = 'login request for ' + $scope.user.username;
    }
  })
app.controller('regController',
  function($scope, $rootScope, $http, $location) {
    $scope.user = { username: '', fullname: '', email: '', password: '' };
    $scope.error_message = '';

    $scope.register = function() {
      $http.post('/auth/signup', $scope.user).success(function(data) {
        if (data.state == "success") {
          $('.modal').modal('hide');
          $scope.user = { username: '', fullname: '', email: '', password: '' };
          $scope.error_message = '';
          $rootScope.authenticated = true;
          $rootScope.currentUser = data.user.username;
          $rootScope.currentUserId = data.user._id;
          $location.path('/');
        } else {
          $scope.error_message = data.message;
        }
      });
    }
  })
