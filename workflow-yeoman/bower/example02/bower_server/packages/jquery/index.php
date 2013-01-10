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

  echo json_encode(new Package("jquery"),JSON_UNESCAPED_SLASHES);

?>