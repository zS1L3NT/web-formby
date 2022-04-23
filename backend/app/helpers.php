<?php

function error($error, $status = 400)
{
	return response(
		["error" => $error],
		$status
	);
}
