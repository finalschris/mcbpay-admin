<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Register extends MY_Controller
{
	function __construct()
	{
		parent::__construct();
	}
	function index()
	{	
			//$this->load->database();
			$this->theme_view = 'register';
			$this->view_data['form_action']= 'auth/register';
			$this->content_view = 'auth/register';
	}
}