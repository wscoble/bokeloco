module Types exposing (..)


type Msg
    = Navigate Location
    | UpdatedPath String


type alias Location =
    { pathname : String
    , title : String
    }


type Page
    = Home
    | Services
    | Portfolio
    | Blog
    | Contact


getLocation : Page -> Location
getLocation page =
    case page of
        Home ->
            Location "/" "BokeLoco"

        Services ->
            Location "/services" "Services"

        Portfolio ->
            Location "/portfolio" "Portfolio"

        Blog ->
            Location "/blog" "Blog"

        Contact ->
            Location "/contact" "Contact"


nonHomePages : List Page
nonHomePages =
    [ Services, Portfolio, Blog, Contact ]


getLocationFromPath : String -> Location
getLocationFromPath pathname =
    case pathname of
        "/" ->
            getLocation Home

        "/services" ->
            getLocation Services

        "/portfolio" ->
            getLocation Portfolio

        "/blog" ->
            getLocation Blog

        "/contact" ->
            getLocation Contact

        _ ->
            getLocation Home
