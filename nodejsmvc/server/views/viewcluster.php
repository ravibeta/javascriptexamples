<style>
	.clsInfo thead { display:block; }
        .clsInfo tbody {width: 100%;}
        .clsInfo th{width: 100%;}
        .clsInfo td{ color: #000;word-break: break-all;}
	.head { width: 20%;}
	.data {width: 50%;}
</style>
<div>
<?php if(Yii::app()->user->hasFlash('flash-error')): ?>
	<div class="flash-error" style='width: 150%;margin-left: 25px;margin-top: 150px;'>
		<?php echo Yii::app()->user->getFlash('flash-error'); ?>
	</div>
<?php else: ?>
<?php
//$dt =  new DateTime($model->created);
$dtDisplay = '';// $dt->format('M d Y, H:i:s');
?>
<h4 style='color:#FFF;font-size:12px;margin:10px -1px 15px;padding:10px;background:#756C75;'>Cluster <?php echo '<strong><i>'.$model->name.'</i></strong>';?> detail information</h4>
        
<div style='background: none repeat scroll 0 0 #e8e8e8; padding: 10px 15px; margin: 2px; width: 632px;height: 532px; overflow: auto;'>
	<table class='clsInfo'>
		<tbody style=""> 
			<tr>
				    <td class='head'> <?php echo "Name"?> : </td>
				    <td class='data'><?php echo $model->name; ?></td>
			</tr>
                        <tr>
                                    <td class='head'> <?php echo "Status"?> : </td>
                                    <td class='data'><?php echo $model->status; ?></td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Master count"?> : </td>
                                    <td class='data'><?php echo $model->masterCount; ?></td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Slave count"?> : </td>
                                    <td class='data'><?php echo $model->slaveCount; ?></td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Masters"?> : </td>
                                    <td class='data'><table class='clsInfo'><tbody style=""><?php
                                                      foreach($masters as $master){
                                                           echo "<tr><td class='data'><span  style=\"color:blue;text-decoration: underline\" onclick=\"openMesos('".$master['mesosUrl']."')\">".$master['hostname']."</span></td>
                                                                 <td class='data'>".$master['status']."</td></tr>";
                                                      }
                                                      ?></tbody></table>
                                                    </td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Slaves"?> : </td>
                                    <td class='data'><table class='clsInfo'><tbody style=""><?php
                                                      foreach($slaves as $slave){
                                                           echo "<tr><td class='data'>".$slave['hostname']."</td>
                                                                 <td class='data'>".$slave['status']."</td></tr>";
                                                      }
                                                      ?></tbody></table>
                                                    </td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Mesos UI"?> : </td>
                                    <td class='data'><?php if( count($masters) > 0){$url =  $masters[0]['mesosUrl'];
                                                           }else{ $url="";} 
                                                            echo "<a style=\"color:blue;text-decoration: underline\" href=\".$url.\">".$url."</a>";
                                                      ?>
                                    </td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Marathon UI"?> : </td>
                                    <td class='data'><?php if( count($masters) > 0){$url =  $masters[0]['mesosUrl']; 
                                                           $url =  str_replace(':5050', '', $url);
                                                           $url =  str_replace('http', 'https', $url);
                                                           }else{ $url="";}
                                                           echo "<a style=\"color:blue;text-decoration: underline\" href=\"".$url."\">".$url."</a>";
                                                      ?>
                                    </td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Environment"?> : </td>
                                    <td class='data'><?php echo $model->landscape; ?></td>
                        </tr>
                        <tr>
                                    <td class='head'> <?php echo "Marathon group"?> : </td>
                                    <td class='data'><?php echo 'mesos_'.$model->landscape.'_'.$model->name; ?>
                <span style='vertical-align: top;'><a class="tooltip" href="#" style='margin-left: 6px;'>
                        <img style="vertical-align: middle;margin-bottom: 2px;" src="<?php echo Yii::app()->request->baseUrl.'/images/icon-tooltip.png'; ?>"/>
                        <!--<span class="custom help">
                            <img class="testimg" src="<?php echo Yii::app()->request->baseUrl; ?>/images/Help.png" alt="help" height="48" width="48" />
                            This is the LDAP group to manage access to Marathon UI for your cluster. Visit the ITC documentation for this portal for details.
                       </span>-->
                </a></span>
                        </td>
                        </tr>
		</tbody>
	</table>
</div>
<script>
function openMesos(url){
  var win = window.open(url, '_blank');
  win.focus();
}
</script>
<?php endif;?>
