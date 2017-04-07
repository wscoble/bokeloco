module Header exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Style exposing (..)
import List exposing (..)
import Types exposing (..)


{ id, class, classList } =
    stylesNamespace


isActive : String -> String -> CssClasses
isActive here wanted =
    if here == wanted then
        Active
    else
        Inactive


navButton : String -> Location -> Html Msg
navButton location navLocation =
    div
        [ class [ Clickable, NavButton, isActive location navLocation.pathname ]
        , onClick (Navigate navLocation)
        ]
        [ text navLocation.title ]


view : Location -> Html Msg
view location =
    let
        home =
            getLocation Home

        pages =
            List.map getLocation nonHomePages
    in
        header []
            [ div [ class [ LogoWrapper ] ]
                [ img
                    [ src "/assets/logo-small.jpg"
                    , class [ Clickable ]
                    , onClick (Navigate home)
                    ]
                    []
                ]
            , div [ class [ NavigationWrapper ] ]
                (List.map (navButton location.pathname) pages)
            ]
