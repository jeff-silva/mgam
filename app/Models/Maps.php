<?php

namespace App\Models;

class Maps extends \Illuminate\Database\Eloquent\Model
{
	use \App\Traits\Model;

	protected $fillable = [
		'id'
	];

	public function validate($data=[]) {
		return \Validator::make($data, [
			'name' => ['required'],
		]);
	}

	// https://oms.wff.ch/calc.htm
	// https://wiki.openstreetmap.org/wiki/Tile_servers
	static function tile($zoom, $lat, $lng, $url='http://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json') {
		$replace['url'] = $url;
		$replace['s'] = str_shuffle('abc')[0];
		$replace['x'] = floor((($lng + 180) / 360) * pow(2, $zoom));
		$replace['y'] = floor((1 - log(tan(deg2rad($lat)) + 1 / cos(deg2rad($lat))) / pi()) /2 * pow(2, $zoom));
		$replace['z'] = $zoom;

		foreach($replace as $str => $val) {
			$replace['url'] = str_replace('${'.$str.'}', $val, $replace['url']);
			$replace['url'] = str_replace('{'.$str.'}', $val, $replace['url']);
		}

		return $replace;
	}
}