<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AppSourceUpdate extends AppBase
{
    // protected $signature = 'app:source-update {folder}';
    protected $signature = 'app:source-update';
    protected $description = 'Move alteração de arquivo para pasta source';

    public function handle()
    {
        $this->call('config:clear');

        $source_folder = env('SOURCE_UPDATE');
        if (! $source_folder) {
            $this->error("⚠  SOURCE_UPDATE vazio");
            return;
        }

        $files = [
            ['overwrite' => true, 'file' => 'app/Console/Commands'],
            ['overwrite' => true, 'file' => 'app/Http/Controllers/Controller.php'],
            ['overwrite' => true, 'file' => 'database/migrations'],
        ];

        foreach($files as $i => $file) {
            $this->cloneFile($file['file']);
        }

        $this->comment('🎉 Finalizado');
    }

    public function cloneFile($file) {
        $source_folder = env('SOURCE_UPDATE');

        $from_path = realpath(base_path($file));
        $from_files = is_file($from_path)? [$from_path]: glob(rtrim($from_path, '/') .'/*');
        $from_files = array_map('realpath', $from_files);

        $to_path = realpath(rtrim($source_folder, '/') .'/'. ltrim($file, '/'));
        $to_files = is_file($to_path)? [$to_path]: glob(rtrim($to_path, '/') .'/*');
        $to_files = array_map('realpath', $to_files);
        
        foreach($from_files as $i => $from_file) {
            $to_file = $to_files[ $i ];

            // if ($this->confirm("Deseja clonar {$from_file}?", true)) {
                $content = file_get_contents($from_file);
                file_put_contents($to_file, $content);
    
                $this->comment("⁂  clonando: {$from_file}");
                $this->comment("       para: {$to_file}");
                $this->comment('');
            // }
        }
    }
}
