$(document).ready(function(){

  initSliders();

  //NOTE: To append in different container
  var appendToContainer = function(htmlele, record){
    console.log(record)
  };

  var FJS = FilterJS(dealers, '#dealers', {
    template: '#dealers-template',
    search: {ele: '#zipCode'},

    callbacks: {
      afterFilter: function(result){
        $('#total_items').text(result.length);
      }
    }
 
  });


 
  FJS.setStreaming({
    data_url: 'data/dealers.json',
    stream_after: 1
  });


  FJS.addCriteria({field: 'certifications', ele: '#cert-criteria input:checkbox'});

  

  window.FJS = FJS;
});

function initSliders(){


  $('#cert-criteria :checkbox').prop('checked', true);
  $('#all_cert').on('click', function(){
    $('#cert-criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}





