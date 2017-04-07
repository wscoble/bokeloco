module BlogPage exposing (..)

import Html exposing (..)


view : String -> Html msg
view s =
    div []
        [ p []
            [ text "Blog Page" ]
        , p []
            [ text s ]
        ]
