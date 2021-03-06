typicalAgency.controller('aboutUs', function($scope, $http){
  $scope.columns = [
    {
      id: 'full-stack',
      title: 'Full Stack',
      brief: "We're a well-rounded, complete, one-stop shop. That means we do it all, from marketing to full-blown websites, along with everything inbetween."
    },
    {
      id: 'quality',
      title: 'Quality > Quanity',
      brief: "Quality is the utmost important when it comes to the final product. That's what we pride ourselves in quality work."
    },
    {
      id: 'client',
      title: 'Client First',
      brief: "We wouldn't be here without you, the client. That's why we put your needs first. You're part of the process, from beginning to end."
    }
  ];
  $http.get('/api/words/buzzwords?type=tech')
  .success(function(data){
    $scope.techBuzz = data.words[randNum(0, data.words.length-1)].word;
  });
  $http.get('/api/words/buzzwords?type=business')
  .success(function(data){
    $scope.busBuzz = data.words[randNum(0, data.words.length-1)].word;
  });
});
