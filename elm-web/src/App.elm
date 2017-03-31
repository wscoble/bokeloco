module App exposing (..)

import Html exposing (..)
import Header
import Interop
import Types exposing (..)


type alias Model =
    { location : Location
    }


model : Model
model =
    { location = getLocation Home
    }


view : Model -> Html Msg
view model =
    Header.view model.location


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        Navigate loc ->
            ( { model | location = loc }, Interop.updateLocation loc )

        UpdatedPath pathname ->
            let
                loc =
                    getLocationFromPath pathname
            in
                ( { model | location = loc }, Interop.updateTitle loc.title )


init : ( Model, Cmd msg )
init =
    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Interop.pathUpdated UpdatedPath
        ]


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
