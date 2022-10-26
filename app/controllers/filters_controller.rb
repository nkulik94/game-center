class FiltersController < ApplicationController

    def create
        session[:main_list_filters] = {} unless session[:main_list_filters]
        filters = apply_filters
    end

    def destroy
        session[:main_list_filters].delete params[:filter].to_sym
        session.delete :main_list_filters if session[:main_list_filters].none?
    end

    private

    def apply_filters
        filters = session[:main_list_filters]
        filters[:genre] = params[:genre] if params[:genre]
        filters[:developer] = params[:developer] if params[:developer]
        filters[:publisher] = params[:publisher] if params[:publisher]
        filters[:rating] = ((params[:min_rating] ? params[:min_rating] : 0)..(params[:max_rating] ? params[:max_rating] : 5))
        filters
    end
end
