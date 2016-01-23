<?php 
$checked = '';
if($model->backup == 1)
	$checked =  'checked';
?>
<style>
.clsClass{margin-left: 288px; margin-top: -33px;}
#confirmBox{width: 461px !important; top: 30% !important}
#confirmBox p{ padding-top: 0px !important; }
#confirmButtons{ padding-top: 0px !important;}
</style>
<?php $this->pageTitle=Yii::app()->name . ' - Modify Backup Setting';?>
<div style="color:#FFF;font-size:1.8em;left:15px;width: 97%;padding:10px;background-image:linear-gradient(to bottom, #756C75 88%, #756C75 97%)">Modify Backup Setting</div>
    <div class="form" style='margin-top: 20px;margin-left: 40px; width:80%;'>
    <div id='processing' style='display: none;margin-left: 20%;'><img src="<?php echo Yii::app()->request->baseUrl;?>/images/processing.gif"></div>
    <div id="msgBox" class="" style="display:none; width:124%; margin-bottom: 15px;margin-left: -55px;">
          <div id="message" class='error' style="width: 97%; border: 2px solid; padding: 5px 0 5px 20px;"></div>
          <div style="clear:both"></div>
    </div>

        <?php 
            $form = $this->beginWidget('CActiveForm', array(
                                        'id'=>'modbackup-form',
                                        'enableClientValidation'=>true,
                                        'clientOptions'=>array('validateOnSubmit'=>true),
                    )); 
        ?>
	<div class="row">
		<?php echo $form->labelEx($model,'share_name'); ?>
		<?php echo $form->textField($model,'share_name',array('style'=>'width:258px;','disabled'=>'disabled')); ?>
		<?php $form->error($model,'share_name'); ?>
	</div>
        <div class="row">
		<?php echo $form->labelEx($model,'location'); ?>
		<?php echo $form->textField($model,'location',array('style'=>'width:258px;','disabled'=>'disabled')); ?>
		<?php $form->error($model,'location'); ?>
	</div>
        <div class="row">
                <?php echo $form->labelEx($model,'backup'); ?>
		<?php echo $form->checkBox($model,'backup', array('checked'=>$checked));?>
                <?php $form->error($model,'backup'); ?>
		<span><a href='#' onClick="javascript: policy()" style='margin-left: 35px;font-size:12px;color: #06c;'>Backup Policy</a></span>
        </div>
        <div class="row buttons" style='margin-left: 170px; margin-top: 25px;'>
		<?php echo $form->hiddenField($model,'id',array('style'=>'')); ?>
                <?php echo CHtml::submitButton('Save', array('id'=>'modBackupCifs','style'=>'')); ?>
        </div>
        <?php $this->endWidget(); ?>

    </div><!-- form -->

<script type='text/javascript'>


$('#modBackupCifs').click(function() {

        var data = $("#modbackup-form").serialize();
	callAj('modbackup-form',data,
       		function () { 
			window.location.href = '/storage/index.php?r=cifs/listcifs';
		},'/storage/index.php?r=cifs/modifybackup'
    	);
	return false;
});
</script>
