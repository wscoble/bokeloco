module PortfolioPage exposing (..)

import Html exposing (..)


view : String -> Html msg
view s =
    div []
        [ p []
            [ text "Portfolio Page" ]
        , p []
            [ text s ]
        ]
