module Types exposing (..)

import Regex exposing (..)
import Array exposing (..)


type Msg
    = Navigate Location
    | UpdatedPath String


type alias Location =
    { pathname : String
    , title : String
    , page : Page
    }


type Page
    = Home
    | Services
    | Portfolio String
    | Blog String
    | Contact


getLocation : Page -> Location
getLocation page =
    case page of
        Home ->
            Location "/" "BokeLoco" Home

        Services ->
            Location "/services" "Services" Services

        Portfolio s ->
            Location ("/portfolio" ++ s) "Portfolio" (Portfolio s)

        Blog s ->
            Location ("/blog" ++ s) "Blog" (Blog s)

        Contact ->
            Location "/contact" "Contact" Contact


nonHomePages : List Page
nonHomePages =
    [ Services, Portfolio "/", Blog "/", Contact ]


getLocationFromPath : String -> Location
getLocationFromPath pathname =
    case pathname of
        "/" ->
            getLocation Home

        "/services" ->
            getLocation Services

        "/portfolio" ->
            getLocation (Portfolio "/")

        "/blog" ->
            getLocation (Blog "/")

        "/contact" ->
            getLocation Contact

        s ->
            if contains (regex "^/blog/(.*)$") s then
                let
                    subpage =
                        case get 1 (fromList (split (AtMost 1) (regex "/blog") s)) of
                            Just p ->
                                p

                            Nothing ->
                                "/"
                in
                    getLocation (Blog subpage)
            else if contains (regex "^/portfolio/(.*)$") s then
                let
                    subpage =
                        case get 1 (fromList (split (AtMost 1) (regex "/portfolio") s)) of
                            Just p ->
                                p

                            Nothing ->
                                "/"
                in
                    getLocation (Portfolio subpage)
            else
                getLocation Home
