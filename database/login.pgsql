CREATE OR REPLACE FUNCTION public.login(IN _email character, IN _password character)
    RETURNS json
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE 
  userid users.user_id%TYPE := 0;
  message character varying(200) := '';
  login boolean := false;
BEGIN 

	-- Validar que el email exista
  SELECT user_id INTO userid FROM users WHERE email = _email AND password = crypt(_password, password);

  IF (userid > 0 AND userid IS NOT NULL) THEN
    RAISE NOTICE 'USER LOGIN';
    SELECT 'Login user ok' INTO message;
    SELECT true INTO login;

  ELSE
    RAISE NOTICE 'INCORRECT DATA';
    SELECT 'Bad credentials' INTO message;
    SELECT false INTO login;
  END IF;
	
  RETURN row_to_json(resp) FROM (
    SELECT 
        userid as user_id
      , message as message
      , login as credentials
      , _email as email
  ) AS resp;

END;
$BODY$;


SELECT public.login(
	'jperez2@sw1848.com', 
	'123456'
);


select password, crypt('123456', password) from users
