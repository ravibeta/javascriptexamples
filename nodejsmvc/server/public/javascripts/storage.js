/* Function for Ajax call */
function callWS(data, onSuccess, url) {
  $.ajax({
    url: url,
    data: data,
    dataType: 'json',
    async: false,
    type: "POST",
    success: function(data, status, jqXHR) {
	$('#message').html("");
       $('#message').html(data.success ? data.successMessage : data.errorMessage);
       if (onSuccess) {
           $('#message').attr('class', data.success ? 'success' : 'error');
       }
       else {
           $('#message').attr('class','');
       }

       $('#msgBox').show();
       if (data.success && onSuccess) onSuccess();
    },
    error: function(data) {
       $('#message').html(data.errorMessage);
       $('#message').attr('class', 'error');
       $('#msgBox').show();
    }
  });
}

/* function to get input fields value */
function getInput(input, msg) {
  var value = $(input).val();
  if (!value) {
      $(input + 'Error').html(msg + ' is required');
      return null;
  }
  $(input + 'Error').html('');
  return value;
}


function getSelectValue(input, msg) {
  var value = $(input).val();
  if (!value) {
      $(input + 'Error').html('Please select' + msg + '. This is required Field!!');
      return null;
  }
  $(input + 'Error').html('');
  return value;
}

function checkIP(str){

        var flag = true;
        var separated = str.split(",");
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        $.each(separated, function(index, chunk) {
                if(chunk.search(ipformat) == -1){
                        flag = false;
                }
        });
        return flag;
}


function validateData(input,msg){

        var value = $('#'+input).val();
        if (!value) {
                $('#message').html(msg + ' is required');
                $('#msgBox').show()
                return null;
        }else{
                $('#message').html('');
                $('#msgBox').hide();
        }
        return value;
}

function callAj(formId, data, onSuccess, url) {
    
    $('#message').html("");    
    $('#msgBox').hide();    
    $("#"+formId).hide();
    $("#processing").show();

    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        async: false,
        type: "POST",
        success: function(data, status, jqXHR) {
            $('#message').html("");
            $('#message').html(data.success ? data.successMessage : data.errorMessage);
           if (onSuccess) {
               $("#processing").hide();
               if(!data.success)
                    $("#"+formId).show();
               $('#message').attr('class', data.success ? 'success' : 'error');
           }
           else {
               $("#processing").hide();
               $("#"+formId).show();
               $('#message').attr('class','');
           }
           $('#msgBox').show();
           if (data.success && onSuccess) onSuccess();
        },
        error: function(data) {
            $('#message').html(data.errorMessage);
            $('#message').attr('class', 'error');
            $('#msgBox').show();
            $("#"+formId).show();
        }
      });
}