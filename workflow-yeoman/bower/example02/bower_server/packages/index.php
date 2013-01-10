<?php

  $arr = array();

  class Package {
    public $name = "";
    public $url = "";
    private $serverUrl = "git@github.com:netzzwerg/bower-";
    public function __construct($name) {
      $this->name = $name;
      $this->url = $this->serverUrl.$this->name.".git";
    }
  } 

  array_push($arr, new Package("fun"));
  array_push($arr, new Package("core"));

  $jquery = new Package("jquery");
  $jquery->url = "git://github.com/netzzwerg/bower-jquery.git";
  array_push($arr, $jquery);

  echo json_encode($arr,JSON_UNESCAPED_SLASHES);

?>