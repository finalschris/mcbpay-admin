<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Data_Recharge extends MY_Controller {
    function __construct()
    {   
        parent::__construct();
        if (!$this->user) {
            $this->set_last_url();
            redirect('login');
        }
    }

	public function index()
	{
		$this->content_view = 'services/data_recharge';
	}


}
