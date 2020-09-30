CREATE TABLE public.users (
  user_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  email character varying(40),
  password character varying(200),
  name character varying(40),
  created timestamp without time zone,
  updated timestamp without time zone,
  PRIMARY KEY(user_id)
);

CREATE TABLE public.notifications (
  notification_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  user_id integer,
  content character varying(40),
  created timestamp without time zone,
  PRIMARY KEY(notification_id),
  CONSTRAINT fk_notifications_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE public.letters (
  letter_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  user_id integer,
  content text,
  author_letter character varying(3),
  avatar character varying(200),
  created timestamp without time zone,
  updated timestamp without time zone,
  PRIMARY KEY (letter_id),
  CONSTRAINT fk_letters_user
    FOREIGN KEY(user_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE public.responses(
  response_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  letter_id integer,
  content text,
  author_letter character varying(3),
  avatar character varying(200),
  reaction boolean,
  created timestamp without time zone,
  updated timestamp without time zone,
  PRIMARY KEY (response_id),
  CONSTRAINT fk_responses_letters
    FOREIGN KEY(letter_id) 
	    REFERENCES letters(letter_id)
      ON DELETE CASCADE
);

CREATE TABLE public.messages(
  message_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  content character varying(200),
  created timestamp without time zone,
  PRIMARY KEY (message_id)
);

CREATE TABLE public.users_messages(
  user_message_id integer GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
  sender_id integer,
  recipient_id integer,
  message_id integer,
  PRIMARY KEY (user_message_id),
  CONSTRAINT fk_users_messages__messages
    FOREIGN KEY(message_id) 
	    REFERENCES messages(message_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_users_messages__user_sender_id
    FOREIGN KEY(sender_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_users_messages__user_recipient_id
    FOREIGN KEY(recipient_id) 
	    REFERENCES users(user_id)
      ON DELETE CASCADE
);
