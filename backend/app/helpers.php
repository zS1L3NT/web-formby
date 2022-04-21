<?php

function errors(array ...$errors)
{
	return response(
		["errors" => $errors],
		400
	);
}
