<?php

namespace App\Console\Commands;

class AppDbImport extends AppBase
{
    protected $signature = 'app:db-import';
    protected $description = 'Importa schema.sql';

    public function handle()
    {   
        $schema = config('database-schema', []);

        foreach($schema['tables'] as $table_name => $table) {
            if (\Schema::hasTable($table_name)) {
                foreach($table['Fields'] as $field_name => $field) {
                    if (\Schema::hasColumn($table_name, $field_name)) {
                        // \DB::statement("ALTER TABLE `{$table_name}` MODIFY COLUMN `{$field_name}` {$field['Sql']};");
                    }
                    else {
                        $this->comment("criando coluna {$table_name}.{$field_name}");
                        \DB::statement("ALTER TABLE `{$table_name}` ADD COLUMN `{$field_name}` {$field['Sql']};");
                    }
                }
            }

            else {
                $this->comment("criando tabela {$table_name}");
                \DB::statement($table['Sql']);
            }
        }
    }
}
