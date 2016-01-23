<?php
	Yii::app()->clientScript->registerCssFile(Yii::app()->request->baseUrl.'/css/jquery.confirm.css');
        Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl.'/js/jquery.confirm.js'); 
      $this->pageTitle=Yii::app()->name . ' - Detail Cluster';
      $arrayL = array(''=>'Select Environment','dev'=>'Dev','stage'=>'Stage','prod'=>'Prod');
?>
<style type="text/css">
    .tbclass td{
	padding-left: 10px !important;
    }
    .checkBoxClass{float: left;}
    div.row label{width: 262px !important;}
    div.row span label{width: 67px !important;}
    #root span label{width: 30px !important;}
    .clsClass{margin-left: 288px; margin-top: -33px;}
    #confirmBox{width: 461px !important;}
    #confirmBox p{ padding-top: 0px !important; }
    #confirmButtons{ padding-top: 0px !important;}
</style>

    <div style="margin-top:20px;margin-left: 13px;color:#FFF;font-size:1.8em;width: 95%;padding:10px;background-image:linear-gradient(to bottom, #756C75 88%, #756C75 97%)">View Cluster</div>
    <div class="form" style='width:80%;'>
	<div id='processing' style='display: none;margin-top: 100px; margin-left: 40%;'><img src="<?php echo Yii::app()->request->baseUrl;?>/images/processing.gif"></div>
	<div id="msgBox" class="" style="display:none; width: 700px; margin-bottom: 15px;">
           <div id="message" class='error' style="margin-left: 20px; width: 126%; border: 2px solid; padding: 5px 0 5px 5px;"></div>
           <div style="clear:both"></div>
       </div>
        <?php 
            $form = $this->beginWidget('CActiveForm', array(
                    					'id'=>'addcluster-form',
'action'=>Yii::app()->createUrl('//cluster/savecluster'),
				                        'clientOptions'=>array('validateOnSubmit'=>true),
                    )); 
        ?>
	<div class="row">
		<label style="margin-top:20px;margin-left: 13px;width:282px;">location</label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["location"];?></label>
		<?php $form->error($model,'location'); ?>
	</div>
	<div class="row">
                <label style="margin-top:20px;margin-left: 13px;width:282px;">share_name</label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["share_name"];?></label>
		<?php $form->error($model,'share_name'); ?>
	</div>
        
	<div class="row">
                <label style="margin-top:20px;margin-left: 13px;width:282px;">storage_size</label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["storage_size"];?></label>
                <?php $form->error($model,'storage_size'); ?>
        </div>

        <div class="row">
                <label style="margin-top:20px;margin-left: 13px;width:282px;">readgroup</label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["location"].'_'.$model['share_name'].'_ro';?><label>
                <?php $form->error($model,'readgroup'); ?>
        </div>

        <div class="row">
                <label style="margin-top:20px;margin-left: 13px;width:282px;">writegroup<label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["location"].'_'.$model['share_name'].'_rw';?><label>
                <?php $form->error($model,'writegroup'); ?>
        </div>

        <div class="row">
                <label style="margin-top:20px;margin-left: 13px;width:282px;">purpose</label>
                <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["purpose"];?><label>
		 <?php $form->error($model,'purpose'); ?>
	 </div>
	 <div class="row">
	 	 <label style="margin-top:20px;margin-left: 13px;width:282px;">landscape</label>
		 <label style="margin-top:20px;margin-left: 13px;width:282px;"><?php echo $model["landscape"];?></label>
		<?php $form->error($model,'landscape'); ?>
	 </div>

        <?php $this->endWidget(); ?>

    </div><!-- form -->
<script src="//code.jquery.com/jquery-1.11.2.js"></script>
 <script src="../javascripts/bootbox.min.js"></script>
 <script src="../javascripts/jquery.confirm.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../javascripts/simplemodal/basic/js/jquery.simplemodal.js"></script>
<script type="text/javascript" src="../javascripts/simplemodal/basic/js/basic.js"></script>
<script type="text/javascript" src="../javascripts/piechart.js"></script>
<!--<script src="//code.jquery.com/jquery-1.11.2.js"></script>
 <script src="../javascripts/bootbox.min.js"></script>
 <script src="../javascripts/jquery.confirm.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>-->
<script type="text/javascript" src="../javascripts/piechart.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script type='text/javascript'>


$('#addCluster').click(function() {
       //alert('clicked');
	
	var loc = validateData('Cluster_location', 'Location');
	if(loc === null) {// alert('location is invalid'); 
        return false;}

	var share_name = validateData('Cluster_share_name', 'Cluster export name');    
	if(share_name === null) {//alert('share_name is invalid'); 
        return false;}
	
	var regexp = /^[a-zA-Z0-9_/]+$/;
	if (share_name.search(regexp) == -1)
	{
		$('#message').html('Invalid Cluster export name!! only alphanumeric, underscore and / (forward slash) allowed!!');
		$('#msgBox').show();
                //alert('error1');
		return false;
	}	
        var str = share_name.split('/');
        str =  $.grep(str,function(n){ return(n) });
        str = str.join('/');
        $("#Cluster_share_name").val(str);

	var storage = validateData('Cluster_storage_size','Storage Size');
	if(storage === null) 
        {
                $('#message').html('Invalid storage size !! only numeric value allowed!!');
                $('#msgBox').show();
                return false;
        }
	var regexpNum = /^[0-9]+$/;
        if (storage.search(regexpNum) == -1)
        {
                $('#message').html('Invalid storage size !! only numeric value allowed!!');
                $('#msgBox').show();
                return false;
        }
	if(storage > 500){
		$('#message').html('Max 500GB storage allowed for new Cluster share!!');
		$('#msgBox').show();
		return false;
	}	
        var regexpstr = /^[_a-zA-Z0-9]+$/;
        if (readgroup.search(regexpstr) == -1)
        {
                $('#message').html('Invalid readgroup name !!');
                $('#msgBox').show();
                return false;
        }
        if (writegroup.search(regexpstr) == -1)
        {
                $('#message').html('Invalid writegroup name !!');
                $('#msgBox').show();
                return false;
        }
/*
	var roothost = validateData('Cluster_root_host','Root hosts');
	//if(roothost === null) return false;
	if(roothost !== null){	
	if(checkIP(roothost) === false){
		$('#message').html('Invalid root hosts!!');
		$('#msgBox').show();
		return false;
	}
	}

	var readhost = validateData('Cluster_read_host','Read hosts');
	if(readhost !== null){
		if(checkIP(readhost) === false){
        	        $('#message').html('Invalid read hosts!!');
                	$('#msgBox').show();
                	return false;
	        }
	}	

	var writehost = validateData('Cluster_write_host','Write hosts');
        if(writehost === null) return false;
        if(writehost !== null){
                if(checkIP(writehost) === false){
                        $('#message').html('Invalid write hosts!!');
                        $('#msgBox').show();
                        return false;
                }
        }
		
	var owner = validateData('Cluster_owner','Owner');
	if(owner === null) return false;

	var regexpstr = /^[a-zA-Z0-9]+$/;
	if (owner.search(regexpstr) == -1)
        {
                $('#message').html('Invalid owner name !!');
                $('#msgBox').show();
                return false;
        }

	var group = $("#Cluster_group").val();
	if(group != ""){
		if(group.search(regexpstr) == -1){
			$('#message').html('Invalid group name!!');
			$('#msgBox').show();
			return false;
		}
	}

	var ownerPermission = new Array();
	$('input[type="checkbox"].owncls:checked').each(function() {
		ownerPermission.push($(this).val());
	});
	var totalOwnPermission = 0;
	$.each(ownerPermission,function() {
		totalOwnPermission += parseInt(this);
	});
	
	var grpPermission = new Array();
  	$('input[type="checkbox"].grpcls:checked').each(function() {
       		grpPermission.push($(this).val());
  	});	
	var totalGrpPermission = 0;
  	$.each(grpPermission,function() {
    		totalGrpPermission += parseInt(this);
  	});
*/

	/*var evePermission = new Array();
	$('input[type="checkbox"].evecls:checked').each(function() {
		evePermission.push($(this).val());
	});
	var totalEvePermission = 0;
	$.each(evePermission,function() {
		totalEvePermission += parseInt(this);
	});*/
        
        var objective = validateData('Cluster_purpose', 'Cluster purpose');    
	if(objective === null) { //alert('purpose is invalid'); 
        return false;}
        
        var landscape = validateData('Cluster_landscape', 'Landscape');  
	if(landscape === null) { //alert('landscape is invalid'); 
        return false;}
        
	var data = $("#addcluster-form").serialize();
        //alert('before call');
	callAj('addcluster-form',data,
       		function () { 
			window.location.href = '/storage/index.php?r=cluster/listcluster';
		},'/storage/index.php?r=cluster/savecluster'
    	);
        //alert('after call');
	return false;
});

$('input[type="checkbox"].grpcls').change(function(){

  var len = $('input[type="checkbox"].grpcls').size() - 1;
 
  var selected = new Array(); 
  $('input[type="checkbox"].grpcls:checked').each(function() {
       selected.push($(this).val());
  });

  if(this.value == 0 && this.checked == true){
      $(this).siblings().attr("disabled",'disabled');
  }else if(this.value == 0 && this.checked == false){
      $(this).siblings().removeAttr("disabled");
  }else if(this.value !=0  && this.checked == true){
      $('input[type="checkbox"].grpcls').eq(len).attr("disabled",'disabled');
  }else if(this.value != 0 && this.checked == false){
      if(selected.length == 0)
        $('input[type="checkbox"].grpcls').eq(len).removeAttr("disabled");
  }
});

/*$('input[type="checkbox"].evecls').change(function(){
  	
        if(this.value == 0 && this.checked == true){
                $(this).siblings().attr("disabled",'disabled');
        }else if(this.value == 0 && this.checked == false){
                $(this).siblings().removeAttr("disabled");
        }else if(this.value != 0 && this.checked == true){
                $(this).siblings().attr("disabled",'disabled');
        }else if(this.value != 0 && this.checked == false){
                $(this).siblings().removeAttr("disabled");
        }
});*/
</script>
