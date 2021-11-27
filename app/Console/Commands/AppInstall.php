<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AppInstall extends AppBase
{
    protected $signature = 'app:install';
    protected $description = 'Instala aplicação';

    public function handle()
    {   
        $this->call('optimize');
        $this->call('migrate');
        $this->call('db:seed');
        $this->call('app:db-export');
        $this->call('app:make-controllers');
        $this->call('app:make-models');
    }
}
