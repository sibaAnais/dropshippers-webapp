'use strict';

angular.module('dropshippers')
  .controller('PropositionsController',
    ['$scope', '$state', '$filter', 'PropositionService', 'propositionList', 'NgTableParams',
     function ($scope, $state, $filter, PropositionService, propositionList, NgTableParams) {

      console.log('propositionList = ', propositionList);

      $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {date: "asc"}
      }, {
        counts: [],
        total: 0,
        getData: function (params) {
          // propositionList
          // return PropositionService.getPropositions().then(function(res) {
          //   if (res.status != 200)
          //     return null;
          //   else {

          var filteredData = params.filter() ?
                $filter('filter')(propositionList,  params.filter()) :
                propositionList;
          var orderedData = params.sorting() ?
              $filter('orderBy')(filteredData, params.orderBy()) :
              filteredData;
          params.total(orderedData.length);
          return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());


              // var filteredData = params.filter() ?
              //       $filter('filter')(res.data.propositions,  params.filter()) :
              //       res.data.propositions;
              // var orderedData = params.sorting() ?
              //     $filter('orderBy')(filteredData, params.orderBy()) :
              //     filteredData;
              // params.total(orderedData.length);
              // return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
          //   }
          // });

        },
      paginationMaxBlocks: 5,
      paginationMinBlocks: 2
      });

      }
    ]
  );
