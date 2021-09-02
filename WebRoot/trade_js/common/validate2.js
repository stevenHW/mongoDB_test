function f_check_radio( array , errorMsg  )
{
	for ( var index=0; index < array.length; index ++ )
	{
		if ( array[index].checked == true )
		{
			return true; 
		}
	}
	alert( errorMsg );
	return false;
}

function f_check_radio2( array )
{
	for ( var index=0; index < array.length; index ++ )
	{
		if ( array[index].checked == true )
		{
			return true; 
		}
	}	
	return false;
}


function f_check_index( array )
{
	for ( var index=0; index < array.length; index ++ )
	{
		if ( array[index].checked == true )
		{
			return array[index].value; 
		}
	}
	return -1;
}
