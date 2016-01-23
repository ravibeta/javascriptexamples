<style>
.usage_box_div{
width: 867px !important;
}
.ui-accordion .ui-accordion-header .ui-accordion-header-icon {
    left: 30px !important;
    margin-top: 4px !important;
    top: auto !important
}
.ui-accordion .ui-accordion-header {
    position: static;

}
</style>
<div style="margin-top:20px;margin-left: 13px;color:#FFF;font-size:1.8em;width: 95%;padding:10px;background-image:linear-gradient(to bottom, #756C75 88%, #756C75 97%)">Add Legacy CIFS share</div>
 
<?php $this->widget('zii.widgets.jui.CJuiAccordion',array(
            'panels' => array('Add Legacy' => $this->renderPartial('addlegacy', array('model' => $model, 'cc'=>$cc, 'users'=>$users,'locations'=>$locations), true),
			'Bulk Upload Legacy'=> $this->renderPartial('_bulk_legacy',array('model'=>$model, 'cc'=>$cc, 'users'=>$users,'locations'=>$locations),true),
            ),
            'options' => array(
		'animated'=>'bounceslide',
                'autoHeight'=>false,
		'active'=>1,
            ),
            'htmlOptions' => array(
                'style' => 'width:930px;margin: 10px 10px 10px 15px;'

            ),
      ));
?>
<script type='text/javascript'>
    $('.ui-accordion-header-icon .ui-icon .ui-icon-triangle-1-s').css('top', '');
</script>
