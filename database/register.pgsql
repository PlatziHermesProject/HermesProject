CREATE OR REPLACE FUNCTION public.register(IN _email character, IN _password character, IN _name character)
    RETURNS json
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
  response json;
  userid users.user_id%TYPE := 0;
  _current_date TIMESTAMP := null;
  message character varying(200) := '';
  created boolean := false;
BEGIN 

	-- Validar que el email exista
  SELECT user_id INTO userid FROM users WHERE email = _email;

  IF (userid = 0 OR userid IS NULL) AND _email <> '' THEN
    RAISE NOTICE 'PROCESS CREATE USER';
    
    SELECT NOW()::TIMESTAMP INTO _current_date;
    
    INSERT INTO public.users(email, password, name, created, updated)
    VALUES ( _email, crypt(_password, gen_salt('bf')), _name, _current_date, _current_date)
    RETURNING user_id INTO userid;

    SELECT 'Created user' INTO message;
    SELECT true INTO created;

  ELSE

    RAISE NOTICE 'USER ALREADY EXISTS';
    SELECT 'User already exists' INTO message;

  END IF;
	
  RETURN row_to_json(resp) FROM (
    SELECT 
        userid as user_id
      , message as message
      , created as created
  ) AS resp;

END;
$BODY$;


SELECT public.register(
	'jperez@sw1848.com', 
	'hello', 
	'Jorge'
)
