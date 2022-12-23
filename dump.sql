--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    visitors integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (7, 'https://www.github.org/', 'b330d9', 2, 1, '2022-12-22 16:29:11.964409');
INSERT INTO public.urls VALUES (6, 'https://www.hltv.org/', '178fd5', 2, 3, '2022-12-22 16:28:58.997215');
INSERT INTO public.urls VALUES (9, 'https://web.whatsapp.com/', '7f02b0', 3, 2, '2022-12-22 16:34:51.028474');
INSERT INTO public.urls VALUES (10, 'https://www.notion.so', '4155f0', 4, 1, '2022-12-23 11:42:55.965983');
INSERT INTO public.urls VALUES (11, 'https://www.notion.so', '379049', 5, 0, '2022-12-23 11:44:13.241919');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'João', 'joao@gmail.com', '$2b$10$UmP5/GOmZJt0ihRH8UnpWuYjfxWP7oKYqq.x8xoCUNpgu0H/p4WTK', '2022-12-19 15:39:27.953145');
INSERT INTO public.users VALUES (3, 'Douglas', 'douglas@gmail.com', '$2b$10$yJO8U3ksr31Zv/Zf7lFLMuNvQI9jcSW.qliidUxNSPwN2W85jnEAa', '2022-12-22 13:22:04.872905');
INSERT INTO public.users VALUES (4, 'Marcia', 'marcia@gmail.com', '$2b$10$BFhd0rbzkm5NmBGPA9xBSOZYymfls02xsQADtKBt1SU9pIdzabjKO', '2022-12-22 17:22:45.914519');
INSERT INTO public.users VALUES (5, 'Nathan', 'nathan@gmail.com', '$2b$10$t.iBYPVJ/gU9CVV.PU5Vw.R.Rk11cqjO2eJgIpEKqpvnRkTIDIDFm', '2022-12-22 17:23:08.085969');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

