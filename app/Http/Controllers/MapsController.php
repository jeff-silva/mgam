<?php

namespace App\Http\Controllers;

/* Routes examples
Route::get('maps/search', 'App\Http\Controllers\MapsController@search');
Route::get('maps/find/{id}','App\Http\Controllers\MapsController@find');
Route::post('maps/save', 'App\Http\Controllers\MapsController@save');
Route::post('maps/valid', 'App\Http\Controllers\MapsController@valid');
Route::post('maps/remove', 'App\Http\Controllers\MapsController@remove');
Route::get('maps/clone/{id}','App\Http\Controllers\MapsController@clone');
Route::get('maps/export', 'App\Http\Controllers\MapsController@export');
*/

class MapsController extends Controller
{

	public function __construct() {
		$this->middleware('auth:api', [
			'except' => [
				'test',
				'overpass',
			],
		]);
	}

	static function router() {
		\Route::get('maps/search', 'App\Http\Controllers\MapsController@search');
		\Route::get('maps/find/{id}', 'App\Http\Controllers\MapsController@find');
		\Route::post('maps/save', 'App\Http\Controllers\MapsController@save');
		\Route::post('maps/valid', 'App\Http\Controllers\MapsController@valid');
		\Route::post('maps/remove', 'App\Http\Controllers\MapsController@remove');
		\Route::post('maps/clone', 'App\Http\Controllers\MapsController@clone');
		\Route::get('maps/export', 'App\Http\Controllers\MapsController@export');
		
		\Route::get('maps/test', 'App\Http\Controllers\MapsController@test');
		\Route::get('maps/overpass', 'App\Http\Controllers\MapsController@overpass');
	}

	public function search() {
		return \App\Models\Maps::search()->paginate(request('per_page', 10));
	}

	public function find($id) {
		return \App\Models\Maps::find($id);
	}

	public function save() {
		return (new \App\Models\Maps)->store(request()->all());
	}

	public function valid() {
		return \App\Models\Maps::new()->validate(request()->all());
	}

	public function remove($id) {
		return \App\Models\Maps::search()->remove();
	}

	public function clone($id) {
		return \App\Models\Maps::find($id)->clone();
	}

	public function export() {
		return \App\Models\Maps::search()->export(export('format', 'csv'));
	}

	public function test() {
		// // bbox = lng1, lat2, lng2, lat1
		$bbox = request('bbox', '0,0,0,0');
		list($lng1, $lat2, $lng2, $lat1) = explode(',', $bbox);
		$lat = $lat1 + (($lat2-$lat1)/2);
		$lng = $lng1 + (($lng2-$lng1)/2);
		
		$zoom = request('zoom', '16');

		$url = "https://api.openstreetmap.org/api/0.6/map.json?bbox={$bbox}";


		// $content = file_get_contents($url);
		// $content = json_decode($content, true);
		$content = [];

		return array_merge([
			'url' => $url,
			'bbox' => ['lat1'=>$lat1, 'lng1'=>$lng1, 'lat2'=>$lat2, 'lng2'=>$lng2],
			'tiles' => [
				'satellite' => \App\Models\Maps::tile($zoom, $lat, $lng, 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
				'terrain' => \App\Models\Maps::tile($zoom, $lat, $lng, 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoiZnJlZWpzb24iLCJhIjoiY2t3ZGo4eWk5aDI1ODJvcGdkZHM4N2l6MyJ9.Fmr5JEBFWEmv4h1JWFVW3Q'),
				'map' => \App\Models\Maps::tile($zoom, $lat, $lng, 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
			],
		], $content);
	}

	public function overpass() {
		$overpass_host = [
			'https://lz4.overpass-api.de/api/interpreter',
			'https://z.overpass-api.de/api/interpreter',
			'https://overpass.openstreetmap.ru/api/interpreter',
			'https://overpass.openstreetmap.fr/api/interpreter',
			'https://overpass.osm.ch/api/interpreter', // erros=1
			'https://overpass.kumi.systems/api/interpreter',
			'https://overpass.nchc.org.tw/api/interpreter',
		];

		shuffle($overpass_host);
		$overpass_host = $overpass_host[0];


		// $query = '[out:json];
		// 	area(3600046663)->.searchArea;
		// 	(node["amenity"="drinking_water"](area.searchArea););
		// out;';
		

		// $query = '[out:json];
		// 	(
		// 		node[amenity=fuel]({{bbox}});
		// 		way[amenity=fuel]({{bbox}});
		// 		rel[amenity=fuel]({{bbox}});
		// 	);
		// out;';

		// $query = [
		// 	'data' => '[out:json];[bbox];node[amenity=post_box];out;',
		// 	'bbox' => '-23,-43.3,-22.8,-43.1',
		// ];

		// $query = [
		// 	'data' => 'node[name="Maria"];',
		// ];

		$query = [
			'data' => 'node(-44.00823173109236,-19.994581975288632,-44.00443372312727,-19.991557299733337); <;',
		];

		$query = array_merge($query, request()->all());
		$query['data'] = '[out:json];('. $query['data'] .');out;';
		$url = $overpass_host .'?'. http_build_query($query);

		$data = file_get_contents($url);
		$data = json_decode($data, true);
		$data = is_array($data)? $data: [];

		return array_merge([
			'url' => $url,
		], $data);
	}
}