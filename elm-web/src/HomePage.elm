module HomePage exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Types exposing (..)


view : Html Msg
view =
    div []
        [ p [] [ text "Home Page" ]
        , a [ onClick (Navigate (getLocation (Blog "/foo-meets-bar"))) ] [ text "Foo meets Bar" ]
        ]
