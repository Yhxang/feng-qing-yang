<?php
require('mycms/inc/config.php');

$post = $_REQUEST;
if(!isset($post["act"])){
	$post["act"] = "";
}

if($post["act"]=="newslist"){
	$set['cid']=1;
	$set['pagesize']=12;
	$articles=alist($set);
	
	if(isset($articles["list"])&&$articles["list"][0]["id"]>0){
		foreach($articles["list"] as $k=>$v){
			$rs[] = array("newsId"=>$v["id"],"title"=>$v["title"],"imgsrc"=>$v["newsimg"],"description"=>$v["description"],"date"=>date("Y-m-d",strtotime($v["newstime"])));
		}
	}
	echo json_encode($rs,JSON_UNESCAPED_UNICODE);
}

if($post["act"]=="news"){
	$set['cid']=1;
	$set['pagesize']=1;	
	if(!isset($post['newsId'])){
		$rs = array("code"=>"-1");
		echo json_encode($rs,JSON_UNESCAPED_UNICODE);
		exit();
	}
	if($post['newsId']>0){
		$set['where']['id']=intval($post['newsId']);
		$article=a($set);
			if(isset($article)&&$article["id"]>0){
				$v = $article;
				$rs= array("code"=>"1","newsId"=>$v["id"],"pageTitle"=>$v["title"],"imgsrc"=>$v["newsimg"],"pageBody"=>$v["content"],"publishDate"=>date("Y-m-d",strtotime($v["newstime"])));
			}else{
				$rs = array("code"=>"-1");
			}
		}else{
			$rs = array("code"=>"-1");
	}
	
	echo json_encode($rs,JSON_UNESCAPED_UNICODE);
}

?>