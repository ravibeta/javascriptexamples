<div style="display:none;height:30px;text-align:right;width:100%;"><a href='#' id='newServer'>Can not find right server?</a></div>
			<div class="welcome_text">
				<h1>Welcome to Cluster Service</h1>
				<img class="welcome_text_img" alt="image" src="<?php echo Yii::app()->params['site_url'];?>/images/main_logo.png">
				<p>
                                        <span class="span1">Welcome to Cluster Service. This portal enables you to
                        automatically launch new virtual clusters with your choice of resource (RAM/CPU/DISK) confguration.
                                </P>
				<P>
					<BR>Please note that the cost for clusters are not currently billed to your cost center.
                                </p>
			</div>
    <div class="form row buttons" style="margin: 10px 0px; width: 110px; min-height: 32px;">
        <input type="button" id="btnListcluster" class='' name="yt1" value="List Clusters" style='background-color: #7a0d0d;color: #fff; border-radius: 5px;padding: 5px; width: 130px;'>
    </div>

<script type="text/javascript">

$(document).ready(function(){

        var emptyHmtl = '<p style="float: left;margin-left: 390px; margin-top: 80px;"></p>';
    $('#btnListcluster').click(function(){
        window.location.href = '/virtual/index.php?r=cluster/listcluster';
    });

});

</script>
