<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Other_Bills extends MY_Controller {
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
		$this->content_view = 'services/other_bills';
	}


}
