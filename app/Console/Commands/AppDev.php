<?php

namespace App\Console\Commands;

class AppDev extends AppBase
{
    protected $signature = 'app:dev';
    protected $description = 'Prepara dev';

    public function handle()
    {   
        $this->call('optimize');
        $this->call('app:db-export');
        $this->call('optimize');
        $this->call('app:make-models');
        $this->call('app:make-controllers');
        $this->call('optimize');
    }
}
